from fastapi import FastAPI
from api import predict, feedback, dashboard, agent, replay

app = FastAPI(
    title="X1 Predict :: Autonomous AI Financial Engine",
    description="Recursive, agentic backend for financial predictions, scoring, and strategy loop intelligence.",
    version="1.2.0"
)

# Core route integrations
app.include_router(predict.router)
app.include_router(feedback.router)
app.include_router(dashboard.router)
app.include_router(agent.router)
app.include_router(replay.router)

@app.get("/")
def root():
    return {
        "message": "X1 Predict backend operational.",
        "version": "1.2.0",
        "endpoints": [
            "/predict",
            "/feedback",
            "/dashboard",
            "/agent/strategy",
            "/predict/replay"
        ]
    }


