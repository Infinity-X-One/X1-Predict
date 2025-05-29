from datetime import datetime

def weekly_growth_check():
    suggestions = [
        "Consider expanding asset list with crypto pairs.",
        "Add Mixtral or ensemble model for advanced scenarios.",
        "Review system_log.txt for persistent anomalies.",
        "Evaluate monthly prediction accuracy vs. target."
    ]
    with open("logs/system_log.txt", "a", encoding="utf-8") as f:
        for suggestion in suggestions:
            f.write(f"[{datetime.now()}] GrowthBot: {suggestion}\n")
