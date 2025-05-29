# api/metrics_route.py

from fastapi import APIRouter
from supabase import create_client
import os
from dotenv import load_dotenv
from pathlib import Path

router = APIRouter()

# ✅ Load .env
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.get("/metrics")
async def get_metrics():
    pred_response = supabase.table("predictions").select("*").execute()
    opp_response = supabase.table("opportunities").select("*").execute()

    predictions = pred_response.data or []
    opportunities = opp_response.data or []

    total_predictions = len(predictions)
    total_opps = len(opportunities)
    avg_confidence = round(sum(o["confidence"] for o in opportunities) / max(1, total_opps), 2)

    return {
        "total_predictions": total_predictions,
        "total_opportunities": total_opps,
        "avg_confidence": avg_confidence
    }
