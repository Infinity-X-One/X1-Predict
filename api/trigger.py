# trigger.py
from fastapi import APIRouter
from core.loop_executor import LoopExecutor

trigger_router = APIRouter()

@trigger_router.post("/run-loop")
def run_loop():
    loop = LoopExecutor()
    predictions, evaluation = loop.run_loop()
    return {"status": "ok", "predictions": predictions, "evaluation": evaluation}

