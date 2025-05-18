import os
import uuid
from datetime import datetime
from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from supabase import create_client
from dotenv import load_dotenv

# === Load environment variables ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in .env")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# === FastAPI App ===
app = FastAPI()

# === Models ===
class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

# === Load model ===
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# === Utility ===
def get_strategy_threshold():
    result = supabase.table("strategy_config").select("*").order("timestamp", desc=True).limit(1).execute()
    if result.data and "confidence_threshold" in result.data[0]:
        return float(result.data[0]["confidence_threshold"])
    return 0.8  # default fallback

# === Main prediction logic ===
def predict_sentiment(text: str):
    result = classifier(text)[0]
    return result  # {'label': 'Positive', 'score': 0.98}

def run_prediction_loop(assets: List[str]):
    loop_id = str(uuid.uuid4())
    threshold = get_strategy_threshold()
    results = []

    for asset in assets:
        prompt = f"Latest financial news and analysis for {asset}."
        sentiment = predict_sentiment(prompt)

        if sentiment["score"] >= threshold:
            prediction = {
                "asset": asset,
                "sentiment": sentiment["label"].lower(),
                "score": round(sentiment["score"], 4),
                "timestamp": datetime.utcnow().isoformat(),
                "loop_id": loop_id,
                "source": "FinBERT",
                "tags": ["ai", "finance", asset.lower()],
                "raw_prompt": prompt
            }
            results.append(prediction)
            supabase.table("predictions").insert(prediction).execute()

    # Trigger feedback scoring for the new loop
    try:
        os.system("python feedback_score.py")
    except Exception as e:
        print(f"Feedback scoring failed: {e}")

    return results

# === Routes ===
@app.get("/predict", response_model=List[Prediction])
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    return run_prediction_loop(assets)

# === Routers (step 3.2) ===
from api import feedback, adapt, agent
app.include_router(feedback.router)
app.include_router(adapt.router)
app.include_router(agent.router)
