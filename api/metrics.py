from fastapi import APIRouter
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()
router = APIRouter()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@router.get("/metrics/summary")
def summary():
    res = supabase.table("feedback_score").select("*").execute()
    if not res.data:
        return {"error": "No feedback data available."}

    total = len(res.data)
    correct = sum(1 for r in res.data if r.get("is_correct") == True)
    incorrect = total - correct

    accuracy = round((correct / total) * 100, 2) if total else 0

    return {
        "total_predictions": total,
        "correct": correct,
        "incorrect": incorrect,
        "accuracy_percent": accuracy,
    }
