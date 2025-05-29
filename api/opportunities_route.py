# api/opportunities_route.py

from fastapi import APIRouter
from datetime import datetime
from uuid import uuid4
from supabase import create_client
import os
from transformers import pipeline
from dotenv import load_dotenv
from pathlib import Path

router = APIRouter()

# ✅ Load env
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Missing Supabase credentials")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

assets_to_scan = [
    "AAPL", "TSLA", "MSFT", "GOOGL", "NVDA", "AMZN", "META", "BTC", "ETH",
    "SOL", "XRP", "ADA", "MATIC", "LTC", "NFLX", "BABA", "T", "DIS", "PYPL", "SNAP"
]

@router.get("/opportunities")
async def get_opportunities():
    results = []
    loop_id = str(uuid4())

    for asset in assets_to_scan:
        prompt = f"Latest financial news and macro analysis for {asset}."
        result = classifier(prompt)[0]

        score = round(result["score"], 4)
        label = result["label"].lower()
        confidence = score if label == "positive" else 1 - score

        results.append({
            "asset": asset,
            "confidence": round(confidence * 100, 2),
            "sentiment": label,
            "loop_id": loop_id,
            "timestamp": datetime.utcnow().isoformat(),
            "prompt": prompt
        })

    top = sorted(results, key=lambda x: x["confidence"], reverse=True)[:5]

    for r in top:
        supabase.table("opportunities").insert(r).execute()

    return {"top_opportunities": top}
