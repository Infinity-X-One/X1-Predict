'use client';

import { finSynapse } from '@/ai/FinSynapse';

export default function PortfolioPanel() {
  const balance = finSynapse.paperBalance.toFixed(2);
  const holdings = finSynapse.portfolio;
  const history = finSynapse.predictionHistory.slice(-5).reverse();

  return (
    <div className="mt-6 bg-gray-900 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2 text-white">💼 Portfolio Overview</h2>

      <p className="text-white mb-2">💵 Balance: ${balance}</p>

      <div className="mb-4">
        <h3 className="text-white font-semibold">📦 Holdings:</h3>
        <ul className="ml-4 text-sm text-gray-300">
          {Object.entries(holdings).map(([asset, amount]) => (
            <li key={asset}>{asset}: ${amount.toFixed(2)}</li>
          ))}
          {Object.keys(holdings).length === 0 && <li>No holdings yet</li>}
        </ul>
      </div>

      <div>
        <h3 className="text-white font-semibold">📜 Recent Trades:</h3>
        <ul className="ml-4 text-sm text-gray-400">
          {history.map((entry, index) => (
            <li key={index}>
              {entry.asset}: Predicted ${entry.predictedPrice} → Actual ${entry.currentPrice} = {entry.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
