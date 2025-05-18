import os
from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from supabase import create_client
from typing import List
from dotenv import load_dotenv
from uuid import uuid4
import requests

# === Load ENV ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# === FastAPI App ===
app = FastAPI()

# === Import Routers ===
from api import predict, feedback, dashboard, agent, metrics  # INCLUDE THIS LINE

app.include_router(predict.router)
app.include_router(feedback.router)
app.include_router(dashboard.router)
app.include_router(agent.router)
app.include_router(metrics.router)  # REGISTER METRICS ROUTER HERE

