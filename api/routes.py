# routes.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from core.loop_executor import LoopExecutor

app = FastAPI()

# Enable CORS (important for frontend integration later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "API is live"}

@app.get("/run-loop")
def run_loop():
    try:
        print("🟡 /run-loop triggered")
        loop_executor = LoopExecutor()
        predictions, evaluation = loop_executor.run_loop()
        return {
            "predictions": predictions,
            "evaluation": evaluation
        }
    except Exception as e:
        print("🔴 Error in /run-loop:", str(e))  # Output to terminal
        raise HTTPException(status_code=500, detail=f"Loop failed: {str(e)}")
