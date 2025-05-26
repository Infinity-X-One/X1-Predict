import React from 'react';

interface Props {
  accuracy: number;
  streak: number;
}

export function ProofCopilotStatus({ accuracy, streak }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-xl shadow-md mb-8 text-white text-center border border-blue-500">
      <h2 className="text-2xl font-bold mb-2">🚀 Copilot Status</h2>
      <p className="text-lg">📊 Accuracy: <span className="text-green-400">{accuracy}%</span></p>
      <p className="text-lg">🔥 Streak: <span className="text-yellow-400">{streak} wins</span></p>
      <p className="mt-2 text-sm text-gray-300 italic">
        Tracking performance based on real trades + feedback loops.
      </p>
    </div>
  );
}
