def evaluate_user_progress(user_id=None):
    try:
        feedback = supabase.table("feedback_log").select("*").execute().data
    except Exception as e:
        print(f"⚠️ Supabase fetch error: {e}")
        feedback = []

    if not feedback:
        return {
            "accuracy": 0,
            "streak": 0,
            "level": 1
        }

    total = len(feedback)
    wins = sum(1 for f in feedback if f.get("result") == "win")

    streak = 0
    for f in reversed(feedback):
        if f.get("result") == "win":
            streak += 1
        else:
            break

    accuracy = round((wins / total) * 100, 2)

    return {
        "accuracy": accuracy,
        "streak": streak,
        "level": 2  # Optional dynamic logic later
    }
