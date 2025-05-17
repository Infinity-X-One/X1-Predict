# run_loop.py
import yfinance as yf
from transformers import pipeline
from datetime import datetime
import json
import os

ASSETS = ["AAPL", "MSFT", "TSLA", "NVDA", "GOOGL"]
DATE = "2025-05-16"

# Load FinBERT model
sentiment_model = pipeline("sentiment-analysis", model="ProsusAI/finbert")

results = []

print(f"\n🔁 Running X1 Prediction Loop for {DATE}...\n")

for ticker in ASSETS:
    print(f"📈 Fetching data for {ticker}...")
    data = yf.download(ticker, start=DATE, end=DATE)

    if data.empty:
        print(f"⚠️ No data found for {ticker} on {DATE}. Skipping.\n")
        continue

    # Placeholder headline (normally this would be news sentiment)
    headline = f"{ticker} closed on {DATE} amid market activity."
    prediction = sentiment_model(headline)[0]

    entry = {
        "asset": ticker,
        "date": DATE,
        "headline": headline,
        "sentiment": prediction['label'],
        "confidence": round(prediction['score'], 4)
    }

    print(f"✅ {ticker} → {entry['sentiment']} ({entry['confidence']})\n")
    results.append(entry)

# Save log file
os.makedirs("logs", exist_ok=True)
log_file = f"logs/loop_{DATE.replace('-', '_')}.json"
with open(log_file, "w") as f:
    json.dump(results, f, indent=2)

print(f"✅ Loop complete. Log saved to {log_file}")
