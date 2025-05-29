# memory_client.py

class MemoryClient:
    def __init__(self):
        print("[🧠] MemoryClient initialized")
        self.memory_store = []

    def save(self, result):
        print(f"[🧠] Saving to memory: {result}")
        self.memory_store.append(result)

    def get_all(self):
        return self.memory_store
