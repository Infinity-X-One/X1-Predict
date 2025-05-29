import os
import json
from datetime import datetime

def update_log(message):
    with open("logs/system_log.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] MemoryManager: {message}\n")

def verify_files():
    expected_files = [
        "docs/system_prompt.md",
        "docs/project_state.json",
        "docs/README_COMMANDS.md",
        "agents/PredictorAgent.py",
        "agents/FeedbackAgent.py",
        "agents/StrategistAgent.py",
        "logs/system_log.txt"
    ]
    missing = [f for f in expected_files if not os.path.exists(f)]
    
    if missing:
        for f in missing:
            update_log(f"Missing file: {f}")
    else:
        update_log("All required files are present.")
    
    return missing

def sync_project_state():
    try:
        with open("docs/project_state.json", "r+", encoding="utf-8") as f:
            state = json.load(f)
            state["last_synced_date"] = datetime.now().isoformat()
            f.seek(0)
            json.dump(state, f, indent=2)
            f.truncate()
            update_log("project_state.json synced successfully.")
    except Exception as e:
        update_log(f"Error syncing project_state.json: {e}")

def run_memory_manager():
    verify_files()
    sync_project_state()

