import os
from dotenv import load_dotenv
from pathlib import Path
from supabase import create_client
from datetime import datetime

# ✅ Load environment variables
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

# ✅ Get Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY") or
    os.getenv("SUPABASE_KEY")
)

# 🔍 Debug output
print("🔍 DEBUG (vector_memory): SUPABASE_URL =", SUPABASE_URL or "❌ MISSING")
print("🔍 DEBUG (vector_memory): SUPABASE_KEY =", (SUPABASE_KEY[:10] + "...") if SUPABASE_KEY else "❌ MISSING")

# ❌ Fail fast if missing
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ Supabase credentials are missing. Check your .env file.")

# ✅ Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ✅ store_embedding() – accepts doc_id, text, metadata
def store_embedding(*, doc_id, text, metadata):
    """
    Stores an embedding-like structure in Supabase.
    """
    data = {
        "agent_id": "default-agent",  # ✅ FIX: required by your Supabase schema
        "trace_id": doc_id,
        "raw_text": text,
        "metadata": metadata,
        "timestamp": datetime.utcnow().isoformat()
    }

    try:
        response = supabase.table("memory_vectors").insert(data).execute()
        print("💾 Stored embedding to memory_vectors:", response.data)
    except Exception as e:
        print("❌ Error storing embedding:", str(e))

# ✅ query_embedding() – for vector search (required by memory.py)
def query_embedding(query_vector, top_k=5):
    """
    Query memory_vectors table in Supabase using the match_vectors RPC.
    Returns top_k most similar embeddings.
    """
    try:
        result = supabase.rpc("match_vectors", {
            "query_embedding": query_vector,
            "match_count": top_k
        }).execute()
        print("🔍 Query result:", result.data)
        return result.data
    except Exception as e:
        print("❌ Error querying embeddings:", str(e))
        return []







