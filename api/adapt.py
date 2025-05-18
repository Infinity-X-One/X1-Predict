from fastapi import APIRouter
from supabase import create_client
from dotenv import load_dotenv
import os
from datetime import datetime
import uuid

load_dotenv()
router = APIRouter()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@router.post("/strategy/adapt")
def adapt_strategy():
    feedback_data = supabase.table("feedback_score").select("*").order("prediction_time", desc=True).limit(30).execute().data
    if not feedback_data or len(feedback_data) < 10:
        return {"error": "Not enough data to adapt"}

    correct = sum(1 for r in feedback_data if r.get("is_correct") == True)
    total = len(feedback_data)
    accuracy = round((correct / total) * 100, 2)

    current_config = supabase.table("strategy_config").select("*").order("timestamp", desc=True).limit(1).execute().data
    current_threshold = current_config[0]["confidence_threshold"] if current_config else 0.8

    new_threshold = current_threshold
    if accuracy < 65 and current_threshold > 0.6:
        new_threshold = round(current_threshold - 0.05, 2)
    elif accuracy > 75 and current_threshold < 0.9:
        new_threshold = round(current_threshold + 0.05, 2)

    if new_threshold != current_threshold:
        config = {
            "id": str(uuid.uuid4()),
            "confidence_threshold": new_threshold,
            "reason": f"Auto-adapted from {current_threshold} due to {accuracy}% accuracy",
            "timestamp": datetime.utcnow().isoformat()
        }
        supabase.table("strategy_config").insert(config).execute()
        supabase.table("strategy_history").insert(config).execute()
        return {"updated": True, "new_threshold": new_threshold, "accuracy": accuracy}

    return {"updated": False, "threshold": current_threshold, "accuracy": accuracy}

