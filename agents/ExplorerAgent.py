import requests
import time
import random

# === Constants ===
API_KEY = "demo"  # Replace with a real NewsAPI key
API_URL = "https://newsapi.org/v2/everything"

# === Configuration ===
DEFAULT_ASSETS = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
NUM_HEADLINES = 3  # Number of headlines to fetch per asset

def fetch_headlines(asset):
    try:
        params = {
            "q": asset,
            "sortBy": "publishedAt",
            "pageSize": NUM_HEADLINES,
            "apiKey": API_KEY
        }
        response = requests.get(API_URL, params=params)
        articles = response.json().get("articles", [])
        headlines = [a["title"] for a in articles if "title" in a]
        return headlines
    except Exception as e:
        print(f"[ExplorerAgent] Error fetching for {asset}: {e}")
        return []

def build_prompts(assets=DEFAULT_ASSETS):
    prompts = {}

    for asset in assets:
        headlines = fetch_headlines(asset)
        if headlines:
            combined = " ".join(headlines)
            prompt = f"Latest financial sentiment on {asset}: {combined}"
        else:
            prompt = f"Latest financial news and analysis for {asset}."
        prompts[asset] = prompt
        time.sleep(random.uniform(1, 2))  # Polite rate limiting

    return prompts

# === Test Execution ===
if __name__ == "__main__":
    prompts = build_prompts()
    for asset, prompt in prompts.items():
        print(f"\n{asset} Prompt:\n{prompt}")
