# api/proof_data_route.py

from fastapi import APIRouter
from supabase import create_client
from dotenv import load_dotenv
from pathlib import Path
import os
import datetime

router = APIRouter()

# ✅ Load .env
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.get("/proof_data")
async def get_proof_data():
    try:
        predictions = supabase.table("predictions").select("*").execute().data or []
        trades = supabase.table("simulated_trades").select("*").execute().data or []
        feedback = supabase.table("feedback_log").select("*").execute().data or []

        return {
            "predictions": predictions[-25:],
            "trades": trades[-25:],
            "feedback_log": feedback[-25:],
            "metadata": {
                "generated_at": datetime.datetime.utcnow().isoformat()
            }
        }
    except Exception as e:
        return {"error": str(e)}

