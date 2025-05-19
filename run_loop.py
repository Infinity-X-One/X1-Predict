import uuid
import time
import os
from datetime import datetime, timedelta
from AgentManager import AgentManager
from feedback_score import score_prediction
from memory_search import search_similar_vectors
from vector_memory import save_vector

# === CONFIGURATION ===
LOOP_INTERVAL_SECONDS = 10       # Delay between loops
MEMORY_DIMENSION = 1536          # Vector size
TRAIN_THRESHOLD = 0.85           # Score threshold for training

# === Utility: Get last valid weekday (Mon–Fri) ===
def get_last_market_day():
    today = datetime.utcnow().date()
    while today.weekday() >= 5:  # 5 = Saturday, 6 = Sunday
        today -= timedelta(days=1)
    return today

# === Main Autonomous Loop ===
def run_loop():
    print("🚀 X1 Predict Autonomous Loop Started")
    target_date = get_last_market_day()
    print(f"📅 Using market date: {target_date}")

    while True:
        trace_id = str(uuid.uuid4())
        print(f"\n🔁 New Run | Trace ID: {trace_id} | {datetime.utcnow().isoformat()}")

        # STEP 1: Recall memory
        query_vector = [0.1] * MEMORY_DIMENSION  # Replace with real signal if available
        memory_hits = search_similar_vectors(query_vector)
        print(f"🧠 Memory Hits: {len(memory_hits)}")

        # STEP 2: Run agent with memory
        agent = AgentManager(memory=memory_hits)
        prediction = agent.run()

        # STEP 3: Score prediction
        score = score_prediction(prediction)
        print(f"🎯 Feedback Score: {score:.3f}")

        # STEP 4: Train memory if high score
        if score >= TRAIN_THRESHOLD:
            print("✅ High score — saving to memory.")
            save_vector(
                agent_id=agent.agent_id,
                vector=prediction["vector"],
                score_weights=prediction["score_weights"],
                trained_from="autoloop",
                trace_id=trace_id
            )
        else:
            print("⚠️ Score below threshold — skipping memory save.")

        # STEP 5: Log result
        os.makedirs("logs", exist_ok=True)
        with open("logs/loop_log.txt", "a", encoding="utf-8") as log:
            log.write(f"{datetime.utcnow().isoformat()}, {trace_id}, {score:.3f}, {prediction['decision']}\n")

        # STEP 6: Wait for next cycle
        print(f"⏱️ Sleeping for {LOOP_INTERVAL_SECONDS} seconds...\n")
        time.sleep(LOOP_INTERVAL_SECONDS)

if __name__ == "__main__":
    run_loop()

