// src/ai/FinSynapse.ts
export class FinSynapse {
  userName: string = "Founder";
  predictionHistory: any[] = [];
  portfolio: Record<string, number> = {};
  paperBalance: number = 1000;

  constructor() {
    console.log("🤖 FinSynapse Online - Agentic Mode Activated");
  }

  greetUser(): string {
    return `Welcome back, ${this.userName}. I’m FinSynapse, your Agentic AI. Let's grow.`;
  }

  setUser(name: string) {
    this.userName = name;
  }

  receivePrediction(asset: string, predictedPrice: number, currentPrice: number) {
    const win = predictedPrice > currentPrice ? "Up" : "Down";
    this.predictionHistory.push({ asset, predictedPrice, currentPrice, result: win });
    return `📈 Prediction logged: ${asset} expected to go ${win}`;
  }

  makeDecision(currentPrice: number, predictedPrice: number): string {
    const diff = predictedPrice - currentPrice;
    if (Math.abs(diff) < 1) return "📊 Hold - Not enough movement.";
    if (diff > 1) return "🟢 Buy - Strong upward signal.";
    return "🔴 Sell - Downward signal expected.";
  }

  executePaperTrade(asset: string, amount: number, direction: "buy" | "sell") {
    const value = amount;
    if (direction === "buy") {
      this.paperBalance -= value;
      this.portfolio[asset] = (this.portfolio[asset] || 0) + amount;
      return `🛒 Bought $${amount} of ${asset}. New balance: $${this.paperBalance.toFixed(2)}`;
    } else {
      const held = this.portfolio[asset] || 0;
      const sellAmount = Math.min(held, amount);
      this.paperBalance += sellAmount;
      this.portfolio[asset] = held - sellAmount;
      return `💸 Sold $${sellAmount} of ${asset}. New balance: $${this.paperBalance.toFixed(2)}`;
    }
  }

  report(): string {
    return `📊 Portfolio Value: $${this.paperBalance.toFixed(2)} | Holdings: ${JSON.stringify(this.portfolio)}`;
  }

  suggestAction(asset: string, predicted: number, current: number): string {
    return this.makeDecision(current, predicted);
  }

  getProof() {
    return this.predictionHistory.slice(-5).map(p => (
      `${p.asset}: Predicted $${p.predictedPrice} | Actual $${p.currentPrice} → ${p.result}`
    )).join('\n');
  }
}

export const finSynapse = new FinSynapse();
