from fastapi import APIRouter, Query
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()
router = APIRouter()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@router.get("/predict/replay")
def replay_predictions(loop_id: str = Query(..., description="Target loop_id to replay")):
    res = supabase.table("predictions") \
        .select("*") \
        .eq("loop_id", loop_id) \
        .order("timestamp", desc=True) \
        .execute()

    if res.data:
        return {
            "loop_id": loop_id,
            "count": len(res.data),
            "predictions": res.data
        }
    return {"error": f"No predictions found for loop_id: {loop_id}"}
