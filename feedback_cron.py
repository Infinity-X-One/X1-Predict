# feedback_cron.py

import os
from datetime import datetime
from supabase import create_client
from transformers import pipeline
from dotenv import load_dotenv
from pathlib import Path

# ✅ Load environment
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ✅ Load FinBERT model
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

def run_feedback_loop():
    trades = supabase.table("simulated_trades").select("*").execute().data

    for trade in trades:
        asset = trade["asset"]
        trade_id = trade.get("id")
        user_id = trade["user_id"]
        direction = trade["direction"]
        timestamp = trade["timestamp"]
        original_confidence = trade["confidence"]

        prompt = f"Recent market data for {asset} suggests?"
        result = classifier(prompt)[0]
        new_sentiment = result["label"].lower()
        new_score = round(result["score"], 4)

        was_right = (
            (direction == "buy" and new_sentiment == "positive") or
            (direction == "short" and new_sentiment == "negative")
        )

        feedback = {
            "trade_id": trade_id,
            "user_id": user_id,
            "asset": asset,
            "direction": direction,
            "initial_confidence": original_confidence,
            "new_sentiment": new_sentiment,
            "new_score": new_score,
            "was_correct": was_right,
            "evaluated_at": datetime.utcnow().isoformat()
        }

        supabase.table("feedback_log").insert(feedback).execute()

    print("✅ Feedback loop completed")

if __name__ == "__main__":
    run_feedback_loop()

