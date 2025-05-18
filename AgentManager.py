import os
from supabase import create_client
from dotenv import load_dotenv
from collections import defaultdict
from datetime import datetime, timedelta

load_dotenv()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

def analyze_feedback():
    print("[AgentManager] Loading recent feedback...")
    try:
        res = supabase.table("feedback_score") \
            .select("*") \
            .order("prediction_time", desc=True) \
            .limit(100) \
            .execute()

        records = res.data
        if not records:
            print("[AgentManager] No feedback data found.")
            return None

        stats = defaultdict(lambda: {"total": 0, "correct": 0, "confidence": 0.0})

        for r in records:
            asset = r.get("asset")
            if not asset:
                continue
            stats[asset]["total"] += 1
            if r.get("is_correct"):
                stats[asset]["correct"] += 1
            stats[asset]["confidence"] += r.get("predicted_score", 0)

        summary = {}
        for asset, data in stats.items():
            accuracy = data["correct"] / data["total"] if data["total"] > 0 else 0
            avg_conf = data["confidence"] / data["total"]
            summary[asset] = {
                "accuracy": round(accuracy, 3),
                "avg_confidence": round(avg_conf, 3),
                "total_predictions": data["total"]
            }

        # Log decision to Supabase
        log = {
            "timestamp": datetime.utcnow().isoformat(),
            "summary": summary,
            "action": "No action taken yet – future logic pending",
        }
        supabase.table("agent_decision_log").insert(log).execute()

        print("[AgentManager] Summary logged.")
        return summary

    except Exception as e:
        print(f"[AgentManager] Error: {e}")
        return None

if __name__ == "__main__":
    analyze_feedback()
