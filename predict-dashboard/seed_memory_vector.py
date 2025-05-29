from supabase import create_client
from dotenv import load_dotenv
import os
import uuid
from datetime import datetime

# Load environment
load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_KEY"))

# Dummy high-quality vector
vector = [0.1] * 1536

data = {
    "agent_id": "strategist",
    "vector": vector,
    "score_weights": {"accuracy": 0.95, "timing": 0.9},
    "trained_from": "seed_script",
    "trace_id": str(uuid.uuid4()),
    "timestamp": datetime.utcnow().isoformat()
}

# Insert into Supabase vector memory
response = supabase.table("memory_vectors").insert(data).execute()

if response.error:
    print("❌ Failed to seed memory:", response.error)
else:
    print("✅ Memory seeded successfully:", response.data)
