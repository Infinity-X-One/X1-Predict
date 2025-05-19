from supabase import create_client
from dotenv import load_dotenv
import os
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Read Supabase credentials from environment
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")  # Make sure this matches your .env

# Debug output
print("🔍 DEBUG: SUPABASE_URL =", SUPABASE_URL or "❌ MISSING")
print("🔍 DEBUG: SUPABASE_KEY =", (SUPABASE_KEY[:10] + "...") if SUPABASE_KEY else "❌ MISSING")

# Fail fast if missing config
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ Supabase credentials are missing. Check your .env file.")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def store_embedding(agent_id, vector, score_weights, trained_from, trace_id):
    """
    Save a vector embedding to the memory_vectors table in Supabase.

    Args:
        agent_id (str): ID of the AI agent that created the vector.
        vector (list or dict): Embedding vector data.
        score_weights (dict): Dictionary of scoring weights used in training.
        trained_from (str): Source or method used to train this vector.
        trace_id (str): Unique identifier for traceability.
    """
    data = {
        "agent_id": agent_id,
        "vector": vector,
        "score_weights": score_weights,
        "trained_from": trained_from,
        "trace_id": trace_id,
        "timestamp": datetime.utcnow().isoformat()
    }

    try:
        response = supabase.table("memory_vectors").insert(data).execute()
        print("💾 Vector saved to memory_vectors:", response.data)
    except Exception as e:
        print("❌ Error saving vector to Supabase:", str(e))

