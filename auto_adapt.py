import os
import json
from dotenv import load_dotenv
from supabase import create_client

# === Load ENV ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# === Parameters ===
MIN_COUNT = 5        # Only score assets with >= 5 feedback entries
MIN_ACCURACY = 50.0  # Cutoff to consider an asset useful
JSON_OUT = "adaptive_assets.json"

def fetch_feedback():
    res = supabase.table("feedback_score").select("*").execute()
    return res.data or []

def analyze_assets(feedback_data):
    stats = {}

    for row in feedback_data:
        asset = row["asset"]
        correct = row.get("is_correct", False)

        if asset not in stats:
            stats[asset] = {"total": 0, "correct": 0}

        stats[asset]["total"] += 1
        if correct:
            stats[asset]["correct"] += 1

    adapted = []

    for asset, data in stats.items():
        if data["total"] < MIN_COUNT:
            continue

        accuracy = (data["correct"] / data["total"]) * 100

        if accuracy >= MIN_ACCURACY:
            adapted.append({
                "asset": asset,
                "total": data["total"],
                "accuracy": round(accuracy, 2)
            })

    return adapted

def save_json(adapted_assets):
    with open(JSON_OUT, "w") as f:
        json.dump(adapted_assets, f, indent=2)
    print(f"[✓] Adaptive list saved to {JSON_OUT}")

if __name__ == "__main__":
    print("🧠 Running Auto-Adapt Agent...")
    feedback = fetch_feedback()
    result = analyze_assets(feedback)
    save_json(result)
