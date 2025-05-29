# api/reward_route.py

from fastapi import APIRouter, Request
from pydantic import BaseModel
from rewardEngine import evaluate_user_progress

router = APIRouter()

class RewardRequest(BaseModel):
    user_id: str
    streak: int
    total_trades: int
    accuracy: float

@router.post("/rewards")
async def run_reward_engine(payload: RewardRequest):
    stats = {
        "streak": payload.streak,
        "total_trades": payload.total_trades,
        "accuracy": payload.accuracy
    }
    results = evaluate_user_progress(payload.user_id, stats)
    return {"rewards": results}
