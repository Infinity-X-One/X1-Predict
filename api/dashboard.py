from fastapi import APIRouter, Query, HTTPException
from supabase import create_client
from dotenv import load_dotenv
import os
from collections import defaultdict

# === Load ENV and Init Supabase ===
router = APIRouter()
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# === /dashboard/summary ===
@router.get("/dashboard/summary")
def summary(limit: int = 10):
    preds = (
        supabase.table("predictions")
        .select("*")
        .order("timestamp", desc=True)
        .limit(limit)
        .execute()
    )
    return preds.data if preds.data else {"error": "No prediction data found"}

# === /dashboard/assets ===
@router.get("/dashboard/assets")
def asset_insight(asset: str):
    res = (
        supabase.table("predictions")
        .select("*")
        .eq("asset", asset.upper())
        .order("timestamp", desc=True)
        .limit(50)
        .execute()
    )
    return res.data if res.data else {"error": f"No data for asset {asset}"}

# === /dashboard/loops ===
@router.get("/dashboard/loops")
def loop_overview(limit: int = 10):
    res = (
        supabase.table("predictions")
        .select("loop_id, timestamp")
        .order("timestamp", desc=True)
        .limit(limit)
        .execute()
    )
    return res.data if res.data else {"error": "No loop data found"}

# === /dashboard/loops/performance ===
@router.get("/dashboard/loops/performance")
def loop_accuracy(limit: int = 10):
    try:
        feedback = (
            supabase.table("feedback_score")
            .select("*")
            .order("prediction_time", desc=True)
            .limit(1000)
            .execute()
        )

        if not feedback.data:
            raise HTTPException(status_code=404, detail="No feedback data available")

        loop_stats = defaultdict(lambda: {"total": 0, "correct": 0, "assets": defaultdict(int)})

        for row in feedback.data:
            loop_id = row.get("loop_id", "unknown")
            loop_stats[loop_id]["total"] += 1
            if row.get("is_correct"):
                loop_stats[loop_id]["correct"] += 1
            loop_stats[loop_id]["assets"][row["asset"]] += 1

        performance = []
        for loop_id, stats in loop_stats.items():
            accuracy = round((stats["correct"] / stats["total"]) * 100, 2)
            performance.append({
                "loop_id": loop_id,
                "accuracy_percent": accuracy,
                "total_predictions": stats["total"],
                "asset_distribution": dict(stats["assets"])
            })

        return sorted(performance, key=lambda x: x["loop_id"], reverse=True)[:limit]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating loop stats: {str(e)}")
