from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

print("🔍 DEBUG: SUPABASE_URL =", SUPABASE_URL or "❌ MISSING")
print("🔍 DEBUG: SUPABASE_KEY =", (SUPABASE_KEY[:10] + "...") if SUPABASE_KEY else "❌ MISSING")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ Supabase credentials are missing. Check .env.")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def search_similar_vectors(query_vector, top_k=5):
    try:
        response = supabase.rpc("match_vectors", {
            "query_vector": query_vector,
            "match_count": top_k
        }).execute()

        return response.data or []
    except Exception as e:
        print("❌ Exception during memory search:", str(e))
        return []

