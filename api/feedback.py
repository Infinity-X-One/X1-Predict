from fastapi import APIRouter, Depends, Query
from supabase import create_client
from dotenv import load_dotenv
import os
from api.auth import verify_token

router = APIRouter()

load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@router.get("/feedback")
def feedback(
    limit: int = Query(10, ge=1, le=100),
    asset: str = Query(None),
    user=Depends(verify_token)
):
    try:
        query = supabase.table("feedback_score") \
            .select("*") \
            .order("prediction_time", desc=True) \
            .limit(limit)

        if asset:
            query = query.eq("asset", asset.upper())

        response = query.execute()
        return response.data if response.data else {"message": "No feedback data found."}

    except Exception as error:
        return {"error": str(error)}
