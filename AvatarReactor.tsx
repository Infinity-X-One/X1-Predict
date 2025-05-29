// components/AvatarReactor.tsx

import React from 'react';

interface AvatarReactorProps {
  streak: number;
  accuracy: number;
  leaderboard: boolean;
}

export const AvatarReactor: React.FC<AvatarReactorProps> = ({
  streak,
  accuracy,
  leaderboard
}) => {
  const getMood = () => {
    if (leaderboard) return '👑 Copilot: "We made it to the charts!"';
    if (streak >= 5) return '🔥 Copilot: "You’re on fire! Keep looping."';
    if (accuracy >= 80) return '🧠 Copilot: "Elite precision detected. Respect."';
    if (accuracy < 50) return '😶 Copilot: "We learn more from losses. Keep going."';
    return '🙂 Copilot: "Systems normal. Ready for the next signal."';
  };

  const getEmoji = () => {
    if (leaderboard) return '🚀';
    if (streak >= 5) return '🔥';
    if (accuracy >= 80) return '🧠';
    if (accuracy < 50) return '🧩';
    return '🤖';
  };

  return (
    <div className="flex items-center bg-black border border-white rounded-2xl px-4 py-3 mb-4 shadow-lg max-w-lg">
      <div className="text-4xl mr-4">{getEmoji()}</div>
      <div className="text-white text-base leading-snug">{getMood()}</div>
    </div>
  );
};
