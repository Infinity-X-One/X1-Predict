from fastapi import FastAPI
from api import predict, feedback, dashboard

app = FastAPI()

app.include_router(predict.router)
app.include_router(feedback.router)
app.include_router(dashboard.router)

