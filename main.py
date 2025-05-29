from core.loop_executor import LoopExecutor

def main():
    loop = LoopExecutor()
    predictions, evaluation = loop.run_loop()

    print("\n=== FINAL OUTPUT ===")
    for pred in predictions:
        print(f"{pred['symbol']}: ${pred['price']}")
    for result in evaluation:
        print(f"[Error] {result['symbol']}: ${result['error']}")

if __name__ == "__main__":
    main()


