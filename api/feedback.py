from fastapi import APIRouter, Query
from supabase import create_client
from dotenv import load_dotenv
import os

router = APIRouter()
load_dotenv()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@router.get("/feedback")
def feedback(limit: int = 10, asset: str = None):
    q = supabase.table("feedback_score").select("*").order("prediction_time", desc=True).limit(limit)
    if asset:
        q = q.eq("asset", asset)
    res = q.execute()
    return res.data if res.data else {"error": "No feedback data found"}
