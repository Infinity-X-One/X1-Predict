class AgentManager:
    def __init__(self, memory=None):
        self.agent_id = "strategist"  # Can be customized dynamically
        self.memory = memory or []

    def run(self):
        # Use memory to influence decision
        if self.memory:
            top = self.memory[0]  # top hit from memory search
            trace_ref = top.get("trace_id", "unknown")
            strategy = f"🧠 Repeat strategy from similar context (trace {trace_ref})"
        else:
            strategy = "📊 Use default strategy — no memory available"

        # Return prediction object expected by run_loop
        prediction = {
            "decision": strategy,
            "vector": [0.1] * 1536,  # Replace with real embedding later
            "score_weights": {
                "accuracy": 0.92,
                "timing": 0.88
            }
        }

        print(f"🤖 Agent Decision: {strategy}")
        return prediction

