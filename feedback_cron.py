import time
import subprocess
from datetime import datetime

# === SETTINGS ===
INTERVAL_MINUTES = 15  # Change to desired interval (e.g., 5, 10, 30)

def run_feedback_scoring():
    print(f"🔁 Running feedback_score.py at {datetime.utcnow().isoformat()}...")
    result = subprocess.run(["python", "feedback_score.py"], capture_output=True, text=True)

    if result.returncode == 0:
        print("✅ Feedback scoring completed successfully.")
    else:
        print("❌ Error running feedback scoring:")
        print(result.stderr)

if __name__ == "__main__":
    print("🧠 Starting Feedback CRON Loop...")
    while True:
        run_feedback_scoring()
        print(f"⏳ Sleeping for {INTERVAL_MINUTES} minutes...\n")
        time.sleep(INTERVAL_MINUTES * 60)
