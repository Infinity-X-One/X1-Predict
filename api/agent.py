from fastapi import APIRouter, Depends
from supabase import create_client
from dotenv import load_dotenv
from api.auth import verify_token
import os
from datetime import datetime
from uuid import uuid4

router = APIRouter()

# Initialize Supabase
load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# === GET /agent/summary ===
@router.get("/agent/summary")
def agent_summary(user=Depends(verify_token)):
    try:
        res = supabase.table("agent_decision_log") \
            .select("summary") \
            .order("timestamp", desc=True) \
            .limit(1) \
            .execute()

        if not res.data:
            return {"message": "No agent decisions found."}

        return res.data[0].get("summary", {})
    except Exception as e:
        return {"error": str(e)}

# === GET /agent/strategy ===
@router.get("/agent/strategy")
def agent_strategy(user=Depends(verify_token)):
    try:
        res = supabase.table("feedback_score") \
            .select("*") \
            .order("prediction_time", desc=True) \
            .limit(100) \
            .execute()
        data = res.data

        if not data:
            return {"message": "No feedback data available"}

        # Compute BTC accuracy
        correct = [r for r in data if r["asset"] == "BTC" and r.get("is_correct")]
        total = [r for r in data if r["asset"] == "BTC"]
        accuracy = len(correct) / len(total) if total else 0

        # Strategy rule
        strategy = {
            "asset": "BTC",
            "accuracy": round(accuracy, 3),
            "action": "reduce_threshold" if accuracy < 0.6 else "hold",
            "new_threshold": 0.7 if accuracy < 0.6 else 0.85,
        }

        # Log the decision
        decision = {
            "id": str(uuid4()),
            "timestamp": datetime.utcnow().isoformat(),
            "summary": {"BTC_accuracy": round(accuracy, 3)},
            "action": strategy["action"]
        }

        supabase.table("agent_decision_log").insert(decision).execute()
        return strategy

    except Exception as e:
        return {"error": str(e)}

