class EnsembleAgent:
    def __init__(self):
        print("[🤖] EnsembleAgent initialized")

    def combine_predictions(self, predictions):
        # Example: Average ensemble
        if not predictions:
            return None
        avg_price = sum(p["price"] for p in predictions) / len(predictions)
        return round(avg_price, 2)
