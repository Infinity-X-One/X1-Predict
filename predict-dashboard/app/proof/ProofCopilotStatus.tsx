// components/ProofCopilotStatus.tsx

'use client';

import React from 'react';

interface Props {
  accuracy: number;
  streak: number;
}

export const ProofCopilotStatus: React.FC<Props> = ({ accuracy, streak }) => {
  const getMood = () => {
    if (streak >= 5) return '🔥 Copilot: "Momentum strong. Keep looping!"';
    if (accuracy >= 80) return '🧠 Copilot: "Signal quality high. System stable."';
    if (accuracy < 50) return '😶 Copilot: "Need better alignment. Watching closely."';
    return '🙂 Copilot: "Normal range. Monitoring signals."';
  };

  const getEmoji = () => {
    if (streak >= 5) return '🚀';
    if (accuracy >= 80) return '🧠';
    if (accuracy < 50) return '⚠️';
    return '🤖';
  };

  return (
    <div className="bg-black border border-cyan-500 p-4 rounded-xl shadow-md text-white mb-6 text-center max-w-xl mx-auto">
      <div className="text-3xl mb-1">{getEmoji()}</div>
      <div className="text-md font-medium">{getMood()}</div>
      <p className="text-sm text-gray-400 mt-2">📈 Accuracy: {accuracy}% | 🔁 Streak: {streak}</p>
    </div>
  );
};
