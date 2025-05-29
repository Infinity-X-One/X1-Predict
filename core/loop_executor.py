from agents.predictor_agent import PredictorAgent
from agents.ensemble_agent import EnsembleAgent
from agents.feedback_agent import FeedbackAgent
from agents.explorer_agent import ExplorerAgent
from simulation.backtest import BacktestSimulator
from memory.memory_client import MemoryClient

class LoopExecutor:
    def __init__(self):
        self.predictor = PredictorAgent()
        self.ensemble = EnsembleAgent()
        self.feedback = FeedbackAgent()
        self.explorer = ExplorerAgent()
        self.simulator = BacktestSimulator()
        self.memory = MemoryClient()

    def run_loop(self):
        try:
            print("[🔁] Starting prediction loop...")

            symbols = self.explorer.discover_assets()
            print(f"[🔍] Discovered new assets: {symbols}")

            predictions = []
            for symbol in symbols:
                price = self.predictor.predict(symbol)
                prediction = {"symbol": symbol, "price": price}
                print(f"[📈] Prediction object: {prediction}")
                predictions.append(prediction)

            print("[📈] Final predictions ready")
            print("[🎯] Running simulation on predictions...")

            sim_results = self.simulator.simulate(predictions)

            print("[💾] Storing simulation results in memory...")
            for result in sim_results:
                self.memory.save(result)

            print("[📊] Evaluation results:")
            for result in sim_results:
                print(f"{result['symbol']}: Predicted ${result['predicted']}, Actual ${result['actual']} → Error: {result['error']}")

            return predictions, sim_results

        except Exception as e:
            print("[❌] Error in run_loop:", str(e))
            raise





