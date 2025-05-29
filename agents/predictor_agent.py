import random

class PredictorAgent:
    def __init__(self):
        print("[🧠] PredictorAgent initialized")

    def predict(self, symbol):
        # Simulate a price prediction
        return round(random.uniform(100, 300), 2)
