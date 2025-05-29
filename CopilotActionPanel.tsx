// components/CopilotActionPanel.tsx

'use client';

import React, { useState } from 'react';
import { getPrompt } from '../lib/promptRouter';
import { CopilotMessage } from './CopilotMessage';
import { PerformanceCard } from './PerformanceCard';
import { AvatarReactor } from './AvatarReactor';

export const CopilotActionPanel = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [totalTrades, setTotalTrades] = useState<number>(0);
  const [successRate, setSuccessRate] = useState<number>(0);
  const [leaderboardNotified, setLeaderboardNotified] = useState<boolean>(false);

  const triggerRewardCheck = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rewards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'demo-user',
          streak,
          total_trades: totalTrades,
          accuracy: successRate,
        }),
      });

      const data = await res.json();
      const rewardMessages = Object.values(data.rewards) as string[];
      setMessages(prev => [...prev, ...rewardMessages]);
    } catch (err) {
      setMessages(prev => [...prev, `❌ Auto reward check failed: ${(err as Error).message}`]);
    }
  };

  const checkLeaderboardTrigger = () => {
    if (successRate >= 75 && totalTrades >= 10 && !leaderboardNotified) {
      const prompt = getPrompt('leaderboardShoutout', {
        rank: Math.floor(Math.random() * 100) + 1,
        winrate: successRate,
      });
      setMessages(prev => [...prev, prompt]);
      setLeaderboardNotified(true);
    }
  };

  const handleAction = async (action: string) => {
    let prompt = '';

    if (action === 'getPrediction') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`);
        const data = await res.json();
        const assets = data?.map((p: any) => p.asset) || [];

        const newStreak = streak + 1;
        const newTotal = totalTrades + 1;
        const newSuccessRate = Math.round(((newStreak / newTotal) * 100) * 10) / 10;

        setStreak(newStreak);
        setTotalTrades(newTotal);
        setSuccessRate(newSuccessRate);

        prompt = getPrompt('fullPredictionDrop', { assets });

        triggerRewardCheck();
        checkLeaderboardTrigger();
      } catch (err) {
        prompt = `⚠️ Error fetching prediction: ${(err as Error).message}`;
      }
    }

    if (action === 'pulseCheck') {
      prompt = getPrompt('pulseCheck');
    }

    if (action === 'checkRewards') {
      triggerRewardCheck();
      return;
    }

    if (prompt) setMessages(prev => [...prev, prompt]);
  };

  return (
    <div className="p-4">
      <AvatarReactor
        streak={streak}
        accuracy={successRate}
        leaderboard={leaderboardNotified}
      />

      <PerformanceCard
        streak={streak}
        totalTrades={totalTrades}
        successRate={successRate}
      />

      <div className="space-x-4 mb-6">
        <button
          onClick={() => handleAction('getPrediction')}
          className="bg-white text-black px-4 py-2 rounded-xl shadow-lg hover:bg-gray-100"
        >
          🔍 Get Predictions
        </button>

        <button
          onClick={() => handleAction('pulseCheck')}
          className="bg-white text-black px-4 py-2 rounded-xl shadow-lg hover:bg-gray-100"
        >
          ⚡ Market Pulse
        </button>

        <button
          onClick={() => handleAction('checkRewards')}
          className="bg-white text-black px-4 py-2 rounded-xl shadow-lg hover:bg-yellow-100"
        >
          🎁 Check Rewards
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <CopilotMessage key={idx} message={msg} />
        ))}
      </div>
    </div>
  );
};
