import os
import uuid
import requests
from datetime import datetime
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from supabase import create_client
from dotenv import load_dotenv

# === Load Environment ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# === FastAPI App ===
app = FastAPI()

# === Sentiment Classifier ===
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# === Pydantic Response Schema ===
class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

# === Prediction Logic ===
def predict_sentiment(text: str):
    return classifier(text)[0]  # {'label': 'Positive', 'score': 0.98}

def run_prediction_loop(assets: List[str]):
    # Try to fetch strategy config + loop_id
    try:
        strategy_data = requests.get("http://127.0.0.1:8000/agent/strategy").json()
        loop_id = strategy_data.get("loop_id", str(uuid.uuid4()))
        threshold = strategy_data.get("new_threshold", 0.85)
    except Exception as e:
        print(f"⚠️ Strategy fetch failed, fallback to default. Error: {e}")
        loop_id = str(uuid.uuid4())
        threshold = 0.85

    results = []
    for asset in assets:
        prompt = f"Latest financial news and analysis for {asset}."
        sentiment = predict_sentiment(prompt)

        result = {
            "asset": asset,
            "sentiment": sentiment["label"].lower(),
            "score": round(sentiment["score"], 3),
            "timestamp": datetime.utcnow().isoformat(),
            "loop_id": loop_id,
            "source": "FinBERT",
            "tags": ["ai", "finance", asset.lower()],
            "raw_prompt": prompt
        }

        results.append(result)
        supabase.table("predictions").insert(result).execute()

    return results

# === FastAPI Endpoint ===
@app.get("/predict", response_model=List[Prediction])
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    return run_prediction_loop(assets)

# === CLI Runner ===
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("x1_predict:app", host="0.0.0.0", port=8000, reload=True)



