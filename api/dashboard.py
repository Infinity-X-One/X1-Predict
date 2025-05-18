from fastapi import APIRouter
from supabase import create_client
from dotenv import load_dotenv
import os

router = APIRouter()
load_dotenv()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@router.get("/dashboard")
def dashboard():
    preds = supabase.table("predictions").select("*").order("timestamp", desc=True).limit(5).execute().data
    feedback = supabase.table("feedback_score").select("*").order("prediction_time", desc=True).limit(20).execute().data

    if not feedback:
        return {"error": "No data"}

    correct = sum(1 for f in feedback if f.get("is_correct"))
    wrong = len(feedback) - correct
    avg_conf = round(sum(abs(f.get("confidence_score", 0)) for f in feedback) / len(feedback), 3)

    return {
        "active_assets": list(set(p["asset"] for p in preds)),
        "loop_id": preds[0]["loop_id"] if preds else None,
        "timestamp": preds[0]["timestamp"] if preds else None,
        "accuracy_last_20": round(correct / len(feedback), 2),
        "feedback_summary": {
            "correct": correct,
            "wrong": wrong,
            "avg_confidence": avg_conf
        },
        "last_predictions": preds
    }
