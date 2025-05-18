from fastapi import APIRouter
from supabase import create_client
from dotenv import load_dotenv
import os
from uuid import uuid4
from datetime import datetime

# === Load ENV + Init ===
load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
router = APIRouter()

# === Strategy Generator Endpoint ===
@router.get("/agent/strategy")
def agent_strategy():
    feedback = supabase.table("feedback_score") \
        .select("is_correct") \
        .order("prediction_time", desc=True) \
        .limit(25).execute()

    if not feedback.data:
        return {"error": "No feedback data available"}

    total = len(feedback.data)
    correct = sum(1 for f in feedback.data if f["is_correct"] is True)
    accuracy = correct / total if total > 0 else 0.0

    # Adjust strategy
    default_threshold = 0.85
    if accuracy < 0.6:
        new_threshold = 0.90
        action = "tighten"
    elif accuracy > 0.85:
        new_threshold = 0.75
        action = "expand"
    else:
        new_threshold = default_threshold
        action = "hold"

    strategy = {
        "new_threshold": round(new_threshold, 3),
        "action": action,
        "accuracy": round(accuracy, 3)
    }

    # Tag loop
    config_id = str(uuid4())
    loop_id = str(uuid4())

    config = {
        "id": config_id,
        "loop_id": loop_id,
        "timestamp": datetime.utcnow().isoformat(),
        "asset": "BTC",
        "threshold": new_threshold,
        "action": action,
        "accuracy": round(accuracy, 3),
        "notes": "Auto-generated config update"
    }

    supabase.table("strategy_config").insert(config).execute()

    # Include loop_id
    strategy["loop_id"] = loop_id
    return strategy

# === Strategy History Viewer Endpoint ===
@router.get("/agent/strategy/history")
def strategy_history(limit: int = 25):
    res = supabase.table("strategy_config") \
        .select("*") \
        .order("timestamp", desc=True) \
        .limit(limit).execute()

    return res.data if res.data else {"error": "No strategy history found"}


