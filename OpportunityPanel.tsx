// components/OpportunityPanel.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { getPrompt } from '../lib/promptRouter';
import { CopilotMessage } from './CopilotMessage';

interface Opportunity {
  asset: string;
  confidence: number;
  sentiment: string;
  timestamp: string;
}

export const OpportunityPanel = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  const fetchOpportunities = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities`);
      const data = await res.json();
      const top = data?.top_opportunities || [];

      setOpportunities(top);

      const prompt = getPrompt('opportunityFeed', { assets: top.map((o: any) => o.asset) });
      setMessages(prev => [...prev, prompt]);
    } catch (err) {
      setMessages(prev => [...prev, `❌ Failed to fetch opportunities: ${(err as Error).message}`]);
    }
  };

  const simulateTrade = async (asset: string, confidence: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulate_trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'demo-user',
          asset,
          direction: 'buy',
          confidence,
          timestamp: new Date().toISOString()
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, data.message, data.copilot_response]);
    } catch (err) {
      setMessages(prev => [...prev, `❌ Trade simulation failed: ${(err as Error).message}`]);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div className="p-4 border border-white rounded-2xl shadow-xl text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🚀 AI Opportunity Feed</h2>

      <div className="grid gap-4 mb-6">
        {opportunities.map((op, idx) => (
          <div
            key={idx}
            className="bg-black border border-gray-700 p-4 rounded-xl"
          >
            <h3 className="text-lg font-semibold">{op.asset}</h3>
            <p>Confidence: <span className="text-green-400">{op.confidence}%</span></p>
            <p>Sentiment: <span className="italic">{op.sentiment}</span></p>
            <p className="text-xs text-gray-400 mt-1">{new Date(op.timestamp).toLocaleTimeString()}</p>

            <button
              onClick={() => simulateTrade(op.asset, op.confidence)}
              className="mt-3 bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-100"
            >
              🎯 Simulate Entry
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {messages.map((msg, i) => (
          <CopilotMessage key={i} message={msg} />
        ))}
      </div>
    </div>
  );
};
