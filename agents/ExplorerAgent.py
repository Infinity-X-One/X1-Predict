import requests
from bs4 import BeautifulSoup
from datetime import datetime

def get_reddit_sentiment(keyword="TSLA"):
    url = f"https://www.reddit.com/search/?q={keyword}"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        r = requests.get(url, headers=headers, timeout=5)
        soup = BeautifulSoup(r.text, "html.parser")
        links = soup.find_all("a")
        return len(links)
    except Exception:
        return 0

def run_explorer():
    tickers = ["TSLA", "NVDA", "AAPL"]
    for t in tickers:
        result = get_reddit_sentiment(t)
        with open("logs/system_log.txt", "a", encoding="utf-8") as log:
            log.write(f"[{datetime.now()}] ExplorerAgent: {t} - {result} Reddit results\n")
