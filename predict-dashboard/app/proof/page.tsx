// app/proof/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { ProofCopilotStatus } from '../../components/ProofCopilotStatus';
import { getFeedbackStats } from '../../lib/getStats';

export default function ProofPage() {
  const [predictions, setPredictions] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accuracy, setAccuracy] = useState(0);
  const [streak, setStreak] = useState(0);

  const fetchData = async () => {
    try {
      const predRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`);
      const oppRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities`);
      const stats = await getFeedbackStats();

      const preds = await predRes.json();
      const opps = await oppRes.json();

      setPredictions(preds.slice(0, 10));
      setOpportunities(opps.top_opportunities || []);
      setAccuracy(stats.accuracy);
      setStreak(stats.streak);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">🧠 InfinityXOS :: Live AI Proof Dashboard</h1>

      <ProofCopilotStatus accuracy={accuracy} streak={streak} />

      {loading ? (
        <p className="text-center">Loading signals...</p>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">🔮 Live Predictions (Last 10)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.map((p, i) => (
                <div key={i} className="bg-black border border-gray-700 p-4 rounded-xl">
                  <p>📈 <strong>{p.asset}</strong> - {p.sentiment} ({p.score})</p>
                  <p className="text-sm text-gray-400">{new Date(p.timestamp).toLocaleTimeString()}</p>
                  <p className="text-xs mt-1 italic">Prompt: {p.raw_prompt}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">🚀 Top Opportunities (AI Flagged)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunities.map((o, i) => (
                <div key={i} className="bg-black border border-yellow-400 p-4 rounded-xl">
                  <p>🔥 <strong>{o.asset}</strong></p>
                  <p>Confidence: {o.confidence}% | Sentiment: {o.sentiment}</p>
                  <p className="text-sm text-gray-400">{new Date(o.timestamp).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center text-green-400 font-medium">
            ✅ This system is live, learning, and evolving. Accuracy improves with every loop.
          </div>
        </>
      )}
    </div>
  );
}

