import subprocess
from datetime import datetime

def run_guarded():
    try:
        result = subprocess.run(["python", "run_loop.py"], capture_output=True, text=True)
        if "Predicted" not in result.stdout:
            raise RuntimeError("Prediction loop failed or returned no output.")
        with open("logs/system_log.txt", "a", encoding="utf-8") as log:
            log.write(f"[{datetime.now()}] LoopGuardian: loop executed successfully.\n")
    except Exception as e:
        with open("logs/system_log.txt", "a", encoding="utf-8") as log:
            log.write(f"[{datetime.now()}] LoopGuardian FAILED: {e}\n")
