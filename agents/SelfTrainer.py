import json
from datetime import datetime

def retrain_if_needed(score_file="logs/scored_predictions.json"):
    try:
        with open(score_file, "r", encoding="utf-8") as f:
            scores = json.load(f)
        errors = [s["error_pct"] for s in scores]
        avg_error = sum(errors) / len(errors)

        if avg_error > 10:
            with open("logs/system_log.txt", "a", encoding="utf-8") as log:
                log.write(f"[{datetime.now()}] SelfTrainer triggered retraining (avg error: {avg_error:.2f}%)\n")
            return "RETRAIN"
        else:
            with open("logs/system_log.txt", "a", encoding="utf-8") as log:
                log.write(f"[{datetime.now()}] SelfTrainer check passed (avg error: {avg_error:.2f}%)\n")
        return "STABLE"
    except Exception as e:
        with open("logs/system_log.txt", "a", encoding="utf-8") as log:
            log.write(f"[{datetime.now()}] SelfTrainer ERROR: {e}\n")
        return "ERROR"
