from supabase import create_client
from dotenv import load_dotenv
import os

# ✅ Force load .env from this script’s directory
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
load_dotenv(dotenv_path=env_path)

# ✅ Load environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

# 🔍 Print for debug
print("✅ Loaded .env from:", env_path)
print("🔍 SUPABASE_URL:", SUPABASE_URL)
print("🔍 SUPABASE_SERVICE_KEY:", SUPABASE_KEY[:10], "...")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Environment variables are missing.")
    exit(1)

# ✅ Create Supabase client
try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("❌ Failed to create Supabase client:", e)
    exit(1)

# 🔍 Vector search function
def search_similar_vectors(query_vector, top_k=5):
    response = supabase.rpc("match_vectors", {
        "query_vector": query_vector,
        "match_count": top_k
    }).execute()

    if response.error:
        print("❌ Search failed:", response.error)
        return []

    return response.data

# 🔍 Run test
if __name__ == "__main__":
    query = [0.1] * 1536  # adjust if your vectors are different size
    results = search_similar_vectors(query)

    if not results:
        print("⚠️ No similar vectors found.")
    else:
        for r in results:
            print(f"🧠 Found | sim={r['similarity']:.4f} | agent={r['agent_id']} | trace={r['trace_id']}")

