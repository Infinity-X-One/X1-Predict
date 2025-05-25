import yfinance as yf
from datetime import datetime, timedelta
import json
import os

def run_predictor():
    tickers = ["AAPL", "MSFT", "TSLA", "NVDA", "GOOGL"]
    predictions = {}

    # Use yesterday and today dynamically
    yesterday = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
    today = datetime.now().strftime('%Y-%m-%d')

    for ticker in tickers:
        print(f"Fetching data for {ticker}...")

        try:
            # Try exact date range first
            data = yf.download(ticker, start=yesterday, end=today, progress=False)

            # If no data, fallback to 5-day range
            if data.empty:
                print(f"No 1-day data for {ticker}. Trying 5-day fallback...")
                data = yf.download(ticker, period="5d", progress=False)

            if data.empty:
                print(f"Still no data for {ticker}. Skipping.")
                continue

            latest_price = data["Close"].iloc[-1]
            predicted_price = round(latest_price * 1.02, 2)

            predictions[ticker] = predicted_price
            print(f"Predicted {ticker}: {predicted_price}")

        except Exception as e:
            print(f"Error fetching {ticker}: {e}")
            continue

    os.makedirs("logs", exist_ok=True)
    with open("logs/predictions.json", "w", encoding="utf-8") as f:
        json.dump(predictions, f, indent=2)

    return predictions

