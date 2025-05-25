import os
import csv
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client

# === Load environment variables ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise EnvironmentError("Missing Supabase credentials in .env")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# === Export logic ===
def export_loop_performance_csv():
    try:
        res = supabase.table("feedback_score").select("*").execute()
        data = res.data

        if not data:
            print("No feedback data found.")
            return

        loop_summary = {}
        for row in data:
            lid = row.get("loop_id")
            asset = row.get("asset")
            correct = row.get("is_correct", False)

            if lid not in loop_summary:
                loop_summary[lid] = {"total": 0, "correct": 0, "assets": {}}
            loop_summary[lid]["total"] += 1
            if correct:
                loop_summary[lid]["correct"] += 1
            loop_summary[lid]["assets"][asset] = loop_summary[lid]["assets"].get(asset, 0) + 1

        # Write to CSV
        filename = f"loop_summary_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"
        output_dir = "logs"
        os.makedirs(output_dir, exist_ok=True)
        filepath = os.path.join(output_dir, filename)

        with open(filepath, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["Loop ID", "Accuracy %", "Total", "Asset Breakdown"])
            for lid, val in loop_summary.items():
                accuracy = round((val["correct"] / val["total"]) * 100, 2)
                assets = "; ".join([f"{k}:{v}" for k, v in val["assets"].items()])
                writer.writerow([lid, accuracy, val["total"], assets])

        print(f"CSV exported: {filepath}")

    except Exception as e:
        print(f"Export failed: {e}")

if __name__ == "__main__":
    export_loop_performance_csv()
