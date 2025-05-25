// app/admin/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { AdminGuard } from '../../components/AdminGuard';
import { AdminMetricsPanel } from '../../components/AdminMetricsPanel';

export default function AdminPage() {
  const [predictions, setPredictions] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  const fetchPredictions = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`);
    const data = await res.json();
    setPredictions(data);
  };

  const fetchOpportunities = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/opportunities`);
    const data = await res.json();
    setOpportunities(data.top_opportunities);
  };

  useEffect(() => {
    fetchPredictions();
    fetchOpportunities();
  }, []);

  return (
    <AdminGuard>
      <div className="p-6 max-w-7xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-4">📊 Admin Signal Feed</h1>

        <AdminMetricsPanel />

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Recent Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.map((p, i) => (
              <div key={i} className="bg-black border border-gray-700 p-4 rounded-xl">
                <p>📈 <strong>{p.asset}</strong></p>
                <p>Sentiment: {p.sentiment}</p>
                <p>Score: {p.score}</p>
                <p className="text-sm text-gray-400">{p.timestamp}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Top Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((o, i) => (
              <div key={i} className="bg-black border border-yellow-500 p-4 rounded-xl">
                <p>🚀 <strong>{o.asset}</strong></p>
                <p>Confidence: {o.confidence}%</p>
                <p>Sentiment: {o.sentiment}</p>
                <p className="text-sm text-gray-400">{o.timestamp}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminGuard>
  );
}

