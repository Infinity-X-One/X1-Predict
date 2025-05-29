# api/trade_route.py

from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from supabase import create_client
import os
from dotenv import load_dotenv
from pathlib import Path

router = APIRouter()

# ✅ Load environment
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class TradeRequest(BaseModel):
    user_id: str
    asset: str
    direction: str  # "buy" or "short"
    confidence: float
    timestamp: str

@router.post("/simulate_trade")
async def simulate_trade(trade: TradeRequest):
    record = {
        "user_id": trade.user_id,
        "asset": trade.asset,
        "direction": trade.direction,
        "confidence": trade.confidence,
        "timestamp": trade.timestamp,
        "status": "simulated"
    }

    supabase.table("simulated_trades").insert(record).execute()

    return {
        "message": f"✅ Trade simulated for ${trade.asset}",
        "copilot_response": f"🧠 Trade on ${trade.asset} logged. Let's track its performance and adjust future calls accordingly."
    }
