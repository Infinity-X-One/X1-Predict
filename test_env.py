import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env file from this directory
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

print("✅ SUPABASE_URL =", os.getenv("SUPABASE_URL"))
print("✅ SUPABASE_KEY =", os.getenv("SUPABASE_KEY"))

