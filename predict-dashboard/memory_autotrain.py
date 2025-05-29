import os
from datetime import datetime
from supabase import create_client
from dotenv import load_dotenv
from uuid import uuid4
from transformers import pipeline

# === Load environment ===
load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# === Summarization pipeline (can swap with finetuned model later) ===
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

# === Auto-training logic ===
def auto_train_from_loops():
    print("[TRAIN] Loading prediction logs...")
    res = supabase.table("predictions").select("*").order("timestamp", desc=True).limit(100).execute()
    if not res.data:
        print("[TRAIN] No prediction data found.")
        return

    summaries = []
    for row in res.data:
        content = f"{row['asset']} — {row['sentiment']} — {row['score']} — {row.get('tags', [])}"
        summary = summarizer(content, max_length=60, min_length=10, do_sample=False)[0]['summary_text']
        summaries.append({
            "id": str(uuid4()),
            "loop_id": row.get("loop_id"),
            "asset": row["asset"],
            "summary": summary,
            "timestamp": datetime.utcnow().isoformat(),
            "tags": row.get("tags", [])
        })
        print(f"[MEMORY] 🔗 Trained from loop {row.get('loop_id')}")

    # Save to vector memory log table
    for item in summaries:
        supabase.table("memory_logs").insert(item).execute()

    print(f"[DONE] Auto-training complete: {len(summaries)} summaries saved.")

if __name__ == "__main__":
    auto_train_from_loops()
