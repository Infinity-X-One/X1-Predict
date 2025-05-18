import os
import json
from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from supabase import create_client, Client
from typing import List
from dotenv import load_dotenv

# === Load .env ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in environment variables.")

# === Supabase Client ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# === FastAPI App ===
app = FastAPI()

# === Prediction Model ===
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# === Pydantic Model ===
class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

# === Get Asset List (Adaptive or Default) ===
def get_assets():
    try:
        with open("adaptive_assets.json", "r") as f:
            assets = [x["asset"] for x in json.load(f)]
            if not assets:
                raise Exception("Adaptive list empty")
        return assets
    except:
        return ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]

# === FinBERT Prediction ===
def predict_sentiment(text: str):
    result = classifier(text)[0]
    return result  # {'label': 'Positive', 'score': 0.98}

# === Main Prediction Loop ===
def run_prediction_loop():
    assets = get_assets()
    loop_id = str(datetime.utcnow().timestamp()).replace(".", "")  # Unique ID per loop
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

# === /predict Endpoint ===
@app.get("/predict", response_model=List[Prediction])
def predict():
    return run_prediction_loop()

# === Local Test Run ===
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

