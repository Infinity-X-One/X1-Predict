from fastapi import APIRouter
from typing import List
from pydantic import BaseModel
from x1_predict import run_prediction_loop

router = APIRouter()

class Prediction(BaseModel):
    asset: str
    sentiment: str
    score: float
    timestamp: str
    loop_id: str
    source: str
    tags: List[str]
    raw_prompt: str

@router.get("/predict", response_model=List[Prediction])
def predict():
    return run_prediction_loop()
