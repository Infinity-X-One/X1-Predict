import os
import uuid
from datetime import datetime
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from supabase import create_client
from dotenv import load_dotenv
from vector_memory import store_embedding
from api import memory  # Ensure this file exists: api/memory.py

# Load environment variables
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# FastAPI instance
app = FastAPI()
app.include_router(memory.router)

# Sentiment classifier
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

def predict_sentiment(text: str):
    result = classifier(text)[0]
    return result

def run_prediction_loop(assets: List[str]):
    results = []
    loop_id = str(uuid.uuid4())

    for asset in assets:
        prompt = f"Latest financial news and analysis for {asset}."
        sentiment = predict_sentiment(prompt)
        result = {
            "asset": asset,
            "sentiment": sentiment["label"].lower(),
            "score": round(sentiment["score"], 3),
            "timestamp": datetime.utcnow().isoformat(),
            "loop_id": loop_id,
            "source": "FinBERT",
            "tags": ["ai", "finance", asset.lower()],
            "raw_prompt": prompt
        }

        # Save to Supabase
        supabase.table("predictions").insert(result).execute()

        # Store in vector DB
        store_embedding(
            doc_id=loop_id,
            text=prompt,
            metadata={
                "asset": asset,
                "sentiment": result["sentiment"],
                "score": result["score"],
                "loop_id": loop_id,
                "timestamp": result["timestamp"],
                "source": result["source"]
            }
        )

        results.append(result)

    return results

@app.get("/predict", response_model=List[Prediction])
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    return run_prediction_loop(assets)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

