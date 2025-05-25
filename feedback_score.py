def score_prediction(prediction):
    """
    Scores the agent's prediction using a weighted average of its internal score_weights.
    This function is meant to simulate feedback — can be replaced with real validation logic later.
    """

    # Extract weights dictionary from the prediction
    weights = prediction.get("score_weights", {})

    # Pull individual metrics
    accuracy = weights.get("accuracy", 0.0)
    timing = weights.get("timing", 0.0)
    # Add more metrics if you want (e.g., confidence, volatility, risk-adjusted return)

    # Example scoring logic: weighted average
    score = (0.6 * accuracy) + (0.4 * timing)

    # Optional: clamp or round
    return round(score, 3)
