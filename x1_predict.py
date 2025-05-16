# x1_predict.py

import os
from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from supabase import create_client, Client
import uvicorn
from typing import List
from dotenv import load_dotenv

# === Load .env file ===
load_dotenv()

# === ENV VARS ===
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in environment variables.")

# === SUPABASE CLIENT ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# === FASTAPI APP ===
app = FastAPI()

# === MODELS ===
class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str

# === PREDICTOR ===
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

def predict_sentiment(text: str):
    result = classifier(text)[0]
    return result  # {'label': 'Positive', 'score': 0.98}

def run_prediction_loop(assets: List[str]):
    results = []
    for asset in assets:
        prompt = f"Latest financial news and analysis for {asset}."
        sentiment = predict_sentiment(prompt)
        result = {
            "asset": asset,
            "sentiment": sentiment["label"],
            "score": round(sentiment["score"], 3),
            "timestamp": datetime.utcnow().isoformat()
        }
        results.append(result)
        supabase.table("predictions").insert(result).execute()
    return results

# === ENDPOINT ===
@app.get("/predict", response_model=List[Prediction])
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    results = run_prediction_loop(assets)
    return results

# === CLI RUNNER ===
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

