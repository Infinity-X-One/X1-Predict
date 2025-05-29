# rewardEngine.py

from typing import Dict

def evaluate_user_progress(user_id: str, stats: Dict[str, float]) -> Dict[str, str]:
    """
    Evaluate user prediction performance and return reward triggers.
    """
    streak = stats.get("streak", 0)
    total_trades = stats.get("total_trades", 0)
    accuracy = stats.get("accuracy", 0.0)

    response = {}

    # Level Unlock Logic
    if accuracy >= 75 and total_trades >= 10:
        response["levelUnlock"] = "Level 2: Accuracy Mastered"
    elif accuracy >= 60 and total_trades >= 5:
        response["levelUnlock"] = "Level 1: Solid Entry"

    # Streak Rewards
    if streak == 3:
        response["milestone"] = "3-Win Streak 🔥"
    elif streak == 5:
        response["milestone"] = "🔥 5-Win Run — Elite Zone Unlocked"
    elif streak >= 10:
        response["milestone"] = "🏆 Hall of Fame Streak — Activate Pro Mode?"

    # Leaderboard Trigger
    if accuracy > 80 and total_trades >= 20:
        response["leaderboard"] = "Rank me globally"

    return response
