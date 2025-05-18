import os
import yfinance as yf
from datetime import datetime, timedelta
from supabase import create_client
from dotenv import load_dotenv
import uuid
from dateutil import parser

# === Load environment variables ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# === Scoring Logic ===
def evaluate_prediction(pred):
    asset = pred['asset']
    predicted_sentiment = pred['sentiment'].lower()
    predicted_score = pred['score']
    prediction_time = parser.isoparse(pred['timestamp'])

    try:
        # Download recent price data
        df = yf.download(
            tickers=asset.upper(),
            interval='5m',
            start=prediction_time - timedelta(minutes=1),
            end=prediction_time + timedelta(minutes=16),
            progress=False
        )

        if df.empty or len(df) < 2:
            print(f"[WARNING] Not enough data for {asset} at {prediction_time}")
            return None

        start_price = df['Close'].iloc[0]
        later_price = df['Close'].iloc[-1]
        percent_change = ((later_price - start_price) / start_price) * 100

        # Classify actual result
        if percent_change > 0.2:
            actual_sentiment = 'positive'
        elif percent_change < -0.2:
            actual_sentiment = 'negative'
        else:
            actual_sentiment = 'neutral'

        is_correct = (predicted_sentiment == actual_sentiment)

        feedback = {
            "id": str(uuid.uuid4()),
            "asset": asset,
            "loop_id": pred.get("loop_id"),
            "predicted_sentiment": predicted_sentiment,
            "predicted_score": predicted_score,
            "prediction_time": prediction_time.isoformat(),
            "actual_price_change": round(percent_change, 4),
            "actual_sentiment": actual_sentiment,
            "is_correct": is_correct,
            "confidence_score": round(predicted_score * (1 if is_correct else -1), 4)
        }

        print(f"[INFO] {asset}: Prediction {'correct' if is_correct else 'wrong'} ({percent_change:.2f}%)")
        return feedback

    except Exception as e:
        print(f"[ERROR] Scoring failed for {asset}: {e}")
        return None

# === Main Runner ===
def run_feedback_analysis():
    res = supabase.table("predictions").select("*").order("timestamp", desc=True).limit(10).execute()

    for pred in res.data:
        feedback = evaluate_prediction(pred)
        if feedback:
            supabase.table("feedback_score").insert(feedback).execute()

if __name__ == "__main__":
    run_feedback_analysis()
