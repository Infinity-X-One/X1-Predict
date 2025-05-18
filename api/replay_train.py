from fastapi import APIRouter, Query
from supabase import create_client
from dotenv import load_dotenv
from dateutil import parser
import os, uuid, yfinance as yf
from datetime import timedelta

load_dotenv()
router = APIRouter()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

@router.get("/replay/train")
def train_from_loop(loop_id: str = Query(..., description="Target loop_id to re-evaluate")):
    res = supabase.table("predictions").select("*").eq("loop_id", loop_id).execute()
    predictions = res.data or []

    if not predictions:
        return {"error": "No predictions found for this loop_id."}

    wins, losses, neutrals = 0, 0, 0
    feedback_rows = []

    for pred in predictions:
        try:
            symbol = pred["asset"]
            timestamp = parser.isoparse(pred["timestamp"])
            df = yf.download(tickers=symbol, interval="5m",
                             start=timestamp, end=timestamp + timedelta(minutes=20))

            if df.empty or len(df) < 2:
                continue

            start_price = df['Close'].iloc[0]
            end_price = df['Close'].iloc[-1]
            change = ((end_price - start_price) / start_price) * 100

            actual = "positive" if change > 0.2 else "negative" if change < -0.2 else "neutral"
            correct = (pred["sentiment"].lower() == actual)

            if actual == "neutral": neutrals += 1
            elif correct: wins += 1
            else: losses += 1

            feedback_rows.append({
                "id": str(uuid.uuid4()),
                "loop_id": loop_id,
                "asset": symbol,
                "predicted": pred["sentiment"],
                "actual": actual,
                "delta": round(change, 2),
                "correct": correct,
                "timestamp": timestamp.isoformat()
            })

        except Exception as e:
            continue

    # Save feedback to Supabase
    for row in feedback_rows:
        supabase.table("training_feedback").insert(row).execute()

    total = wins + losses + neutrals
    return {
        "loop_id": loop_id,
        "total": total,
        "wins": wins,
        "losses": losses,
        "neutral": neutrals,
        "accuracy": round((wins / (wins + losses)) * 100, 2) if (wins + losses) > 0 else 0,
        "stored_rows": len(feedback_rows)
    }
