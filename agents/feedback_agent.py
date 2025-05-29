class FeedbackAgent:
    def __init__(self):
        print("[🔁] FeedbackAgent initialized")

    def score(self, prediction, actual):
        error = abs(prediction - actual)
        return round(error, 2)
