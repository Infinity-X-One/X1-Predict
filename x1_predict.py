import os
import uuid
import requests
from datetime import datetime
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from dotenv import load_dotenv
from supabase import create_client, Client

# === Load Environment Variables ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials.")

# === Initialize Supabase + App ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
app = FastAPI()

# === FinBERT Classifier ===
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# === Output Model ===
class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

# === Prediction Function ===
def predict_sentiment(text: str):
    return classifier(text)[0]  # returns {'label': 'Positive', 'score': 0.98}

# === Adaptive Prediction Loop ===
def run_prediction_loop(assets: List[str]):
    # 1. Get strategy
    try:
        strategy = requests.get("http://127.0.0.1:8000/agent/strategy").json()
        threshold = strategy.get("new_threshold", 0.85)
    except Exception:
        threshold = 0.85

    loop_id = str(uuid.uuid4())
    results = []

    for asset in assets:
        prompt = f"Latest financial news and analysis for {asset}."
        sentiment = predict_sentiment(prompt)

        if sentiment["score"] < threshold:
            continue  # Skip if below threshold

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

# === API Endpoint ===
@app.get("/predict", response_model=List[Prediction])
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    return run_prediction_loop(assets)



