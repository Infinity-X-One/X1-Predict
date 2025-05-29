import json
from datetime import datetime

def read_scores(path="logs/scored_predictions.json"):
    try:
        with open(path, "r") as f:
            return json.load(f)
    except:
        return []

def evaluate_performance(scored):
    if not scored:
        return "NO_DATA"
    avg_error = sum([s["error_pct"] for s in scored]) / len(scored)
    if avg_error > 5:
        return "SWITCH_MODEL"
    return "STABLE"

def apply_strategy():
    scored = read_scores()
    decision = evaluate_performance(scored)

    with open("logs/system_log.txt", "a") as log:
        log.write(f"[{datetime.now()}] StrategistAgent: decision = {decision}\n")

    if decision == "SWITCH_MODEL":
        with open("docs/project_state.json", "r+") as f:
            data = json.load(f)
            if "Mixtral" not in data["models_used"]:
                data["models_used"].append("Mixtral")
            f.seek(0)
            json.dump(data, f, indent=2)
            f.truncate()

    return decision
