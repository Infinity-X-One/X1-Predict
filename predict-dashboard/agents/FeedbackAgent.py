import json
from datetime import datetime

def load_predictions(prediction_file="logs/predictions.json"):
    try:
        with open(prediction_file, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def fetch_actual_price(ticker):
    import yfinance as yf
    data = yf.Ticker(ticker).history(period="1d")
    if data.empty:
        return None
    return data["Close"].iloc[-1]

def score_predictions(predictions):
    scored = []
    for entry in predictions:
        actual = fetch_actual_price(entry["ticker"])
        if actual is None:
            continue
        predicted = entry["prediction"]
        error = abs((actual - predicted) / actual) * 100
        scored.append({
            "ticker": entry["ticker"],
            "predicted": predicted,
            "actual": actual,
            "error_pct": round(error, 2),
            "timestamp": datetime.now().isoformat()
        })
    return scored

def run_feedback_agent():
    past_predictions = load_predictions()
    scored = score_predictions(past_predictions)

    with open("logs/system_log.txt", "a") as log:
        log.write(f"[{datetime.now()}] FeedbackAgent scored {len(scored)} predictions.\n")

    with open("logs/scored_predictions.json", "w") as f:
        json.dump(scored, f, indent=2)

    return scored
