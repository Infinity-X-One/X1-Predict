from fastapi import FastAPI
from api import predict, feedback, dashboard, agent, replay, replay_train

app = FastAPI(
    title="X1 Predict :: Autonomous AI Financial Engine",
    description="Recursive, agentic backend for financial predictions, feedback scoring, and strategy optimization.",
    version="1.2.1"
)

# Modular route includes
app.include_router(predict.router)
app.include_router(feedback.router)
app.include_router(dashboard.router)
app.include_router(agent.router)
app.include_router(replay.router)
app.include_router(replay_train.router)

@app.get("/")
def root():
    return {
        "status": "X1 Predict backend is live.",
        "version": "1.2.1",
        "endpoints": [
            "/predict",
            "/feedback",
            "/predict/replay",
            "/replay/train",
            "/agent/strategy",
            "/dashboard"
        ]
    }

