from supabase import create_client
import os
from datetime import datetime

# ✅ Load credentials from environment variables (Render will pass these in)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# 🔍 Debug output
print("🔍 DEBUG: SUPABASE_URL =", SUPABASE_URL or "❌ MISSING")
print("🔍 DEBUG: SUPABASE_KEY =", (SUPABASE_KEY[:10] + "...") if SUPABASE_KEY else "❌ MISSING")

# ❌ Fail fast if missing credentials
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ Supabase credentials are missing. Check Render's environment variables.")

# ✅ Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ✅ Store embedding into memory_vectors
def store_embedding(agent_id, vector, score_weights, trained_from, trace_id):
    """
    Save a vector embedding to the memory_vectors table in Supabase.
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


# ✅ Query vector memory (search top_k similar vectors)
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



