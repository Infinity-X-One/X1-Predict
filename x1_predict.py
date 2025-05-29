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

# ✅ Internal imports
from vector_memory import store_embedding
from api.reward_route import router as reward_router
from api.opportunities_route import router as opportunities_router
from api.metrics_route import router as metrics_router
from api.trade_route import router as trade_router
from api.proof_data_route import router as proof_data_router  # 🔁 Step 14.4

# ✅ Load .env file
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ SUPABASE_URL or SUPABASE_KEY is missing from .env")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ✅ Initialize FastAPI app
app = FastAPI()

# ✅ Include API routers
app.include_router(reward_router)
app.include_router(opportunities_router)
app.include_router(metrics_router)
app.include_router(trade_router)
app.include_router(proof_data_router)

# ✅ Load FinBERT sentiment classifier
classifier = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# ✅ Pydantic model for output schema
class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

# ✅ Single prediction
def predict_sentiment(text: str):
    result = classifier(text)[0]
    return result

# ✅ Batch prediction + DB insert + embedding
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

# ✅ /predict endpoint
@app.get("/predict", response_model=List[Prediction])
def predict():
    assets = ["AAPL", "TSLA", "MSFT", "BTC", "ETH"]
    return run_prediction_loop(assets)

# ✅ Dev server entrypoint
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("x1_predict:app", host="0.0.0.0", port=8000, reload=True)
