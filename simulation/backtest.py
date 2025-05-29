import random

class BacktestSimulator:
    def __init__(self):
        print("[🎯] BacktestSimulator initialized")

    def simulate(self, predictions):
        print("[🎯] Running simulation on predictions...")
        results = []

        for pred in predictions:
            predicted_price = pred["price"]
            symbol = pred["symbol"]

            # Simulate actual price near prediction
            actual_price = round(predicted_price + random.uniform(-2, 2), 2)
            error = round(abs(predicted_price - actual_price), 2)

            result = {
                "symbol": symbol,
                "predicted": predicted_price,
                "actual": actual_price,
                "error": error
            }

            results.append(result)

        return results
