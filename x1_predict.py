import os
import uuid
from datetime import datetime
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from supabase import create_client, Client
import uvicorn
from dotenv import load_dotenv

# === Load environment variables from .env ===
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in environment variables.")

# === Supabase client setup ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# === FastAPI app initialization ===
app = FastAPI()

# === Response model definition ===
class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

# === Load FinBERT model ===
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

def predict_sentiment(text: str):
    return classifier(text)[0]

def run_prediction_loop(assets: List[str]):
    results = []
    loop_id = str(uuid.uuid4())  # Unique ID for this prediction run

    for asset in assets:
        prompt = f"Latest financial news and analysis for {asset}."
        sentiment = predict_sentiment(prompt)

        result = {
            "asset": asset,
            "sentiment": sentiment["label"],
            "score": round(sentiment["score"], 3),
            "timestamp": datetime.utcnow().isoformat(),
            "loop_id": loop_id,
            "source": "FinBERT",
            "tags": ["ai", "finance", asset.lower()],
            "raw_prompt": prompt
        }

        results.append(result)

        try:
            supabase.table("predictions").insert(result).execute()
        except Exception as e:
            print(f"❌ Supabase insert failed for {asset}:", e)

    return results

@app.get("/predict", response_model=List[Prediction])
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    return run_prediction_loop(assets)

if __name__ == "__main__":
    uvicorn.run("x1_predict:app", host="0.0.0.0", port=8000, reload=True)

