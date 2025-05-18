from api import dashboard
from fastapi import APIRouter, Query
from supabase import create_client
from dotenv import load_dotenv
import os

router = APIRouter()
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.get("/dashboard/summary")
def dashboard_summary():
    # Fetch all predictions
    pred_res = supabase.table("predictions").select("*").execute()
    total_preds = len(pred_res.data) if pred_res.data else 0

    # Fetch all feedback scores
    fb_res = supabase.table("feedback_score").select("*").execute()
    total_fb = len(fb_res.data) if fb_res.data else 0
    correct = sum(1 for row in fb_res.data if row.get("is_correct"))
    accuracy = round((correct / total_fb) * 100, 2) if total_fb else 0

    # Build summary response
    return {
        "total_predictions": total_preds,
        "total_scored": total_fb,
        "accuracy_percent": accuracy,
        "last_loop_id": pred_res.data[-1]["loop_id"] if total_preds else None
    }

@router.get("/dashboard/assets")
def asset_stats(asset: str = Query(..., description="Asset symbol (e.g., AAPL)")):
    # Fetch predictions for the asset
    preds = supabase.table("feedback_score").select("*").eq("asset", asset).execute()
    total = len(preds.data)
    correct = sum(1 for row in preds.data if row.get("is_correct"))
    accuracy = round((correct / total) * 100, 2) if total else 0

    return {
        "asset": asset.upper(),
        "total_predictions": total,
        "accuracy_percent": accuracy,
        "last_prediction": preds.data[0] if preds.data else None
    }

@router.get("/dashboard/loops")
def loop_history(limit: int = 5):
    # Fetch recent prediction loop IDs
    loops = (
        supabase.table("predictions")
        .select("loop_id, timestamp")
        .order("timestamp", desc=True)
        .limit(limit)
        .execute()
    )
    # De-duplicate by loop_id
    loop_ids = list({row["loop_id"]: row for row in loops.data}.values())
    return loop_ids
