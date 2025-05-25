import os
import uuid
from datetime import datetime
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from supabase import create_client
from dotenv import load_dotenv
from pathlib import Path
from vector_memory import store_embedding
# from api import memory  # 🔒 Temporarily disabled if api/memory.py is not ready

# ✅ Load environment variables
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

# ✅ Read Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# ✅ Check that credentials were loaded
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ SUPABASE_URL or SUPABASE_KEY is missing from .env")

# ✅ Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ✅ Initialize FastAPI app
app = FastAPI()
# app.include_router(memory.router)  # 🔒 Disabled temporarily

# ✅ Load the FinBERT sentiment model
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# ✅ Define response model
class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

# ✅ Run one FinBERT prediction
def predict_sentiment(text: str):
    result = classifier(text)[0]
    return result

# ✅ Run prediction loop for multiple assets
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

        # ✅ Store in Supabase
        supabase.table("predictions").insert(result).execute()

        # ✅ Store in vector memory
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

# ✅ API route for /predict
@app.get("/predict", response_model=List[Prediction])
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    return run_prediction_loop(assets)

# ✅ Dev entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("x1_predict:app", host="0.0.0.0", port=8000, reload=True)




