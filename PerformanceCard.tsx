// components/PerformanceCard.tsx

import React from 'react';

interface PerformanceCardProps {
  streak: number;
  totalTrades: number;
  successRate: number;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  streak,
  totalTrades,
  successRate,
}) => {
  const getMessage = () => {
    if (successRate >= 80 && totalTrades >= 10) return "🔥 Elite status achieved. The Copilots salute you.";
    if (streak >= 5) return "⚡ You're on a hot streak. Stay sharp.";
    if (successRate < 50) return "📈 Every trade teaches. Keep looping.";
    return "✅ Solid momentum. Let’s level up.";
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4 rounded-2xl shadow-xl mb-6 border border-gray-700">
      <h2 className="text-xl font-bold mb-2">🎯 Performance Summary</h2>
      <div className="space-y-1">
        <p>🔥 Streak: <span className="font-semibold">{streak}</span></p>
        <p>📊 Total Trades: <span className="font-semibold">{totalTrades}</span></p>
        <p>🎯 Accuracy: <span className="font-semibold">{successRate}%</span></p>
        <p className="mt-2 italic text-sm text-green-400">{getMessage()}</p>
      </div>
    </div>
  );
};
