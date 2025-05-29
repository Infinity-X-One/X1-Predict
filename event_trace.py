from fastapi import APIRouter, Query
from app.utils.sentiment_scanner import get_day_sentiment
from app.utils.news_fetcher import get_news_headlines
from app.models.event_explainer import build_event_insight

router = APIRouter()

@router.get("/event-trace")
def get_event_trace(asset: str = Query(...), date: str = Query(...)):
    """
    Returns an AI explanation of what happened on a given date.
    """
    sentiment_data = get_day_sentiment(asset, date)
    headlines = get_news_headlines(asset, date)
    insight = build_event_insight(asset, date, sentiment_data, headlines)

    return {
        "insight": insight
    }
