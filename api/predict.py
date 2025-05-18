from fastapi import APIRouter
from pydantic import BaseModel
from transformers import pipeline
from datetime import datetime
from uuid import uuid4
from dotenv import load_dotenv
from supabase import create_client
import os, requests

load_dotenv()
router = APIRouter()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: list
    raw_prompt: str

@router.get("/predict")
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    loop_id = str(uuid4())
    results = []

    for asset in assets:
        prompt = f"Latest financial news and analysis for {asset}."
        sentiment = classifier(prompt)[0]

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

    # Auto-trigger feedback scoring
    try:
        train_res = requests.get(
            f"http://localhost:8000/replay/train?loop_id={loop_id}",
            timeout=10
        )
        train_data = train_res.json()
    except Exception as e:
        train_data = {"error": str(e)}

    return {
        "predictions": results,
        "training_feedback": train_data
    }
