// components/AdminMetricsPanel.tsx

'use client';

import React, { useEffect, useState } from 'react';

export const AdminMetricsPanel = () => {
  const [metrics, setMetrics] = useState({
    total_predictions: 0,
    total_opportunities: 0,
    avg_confidence: 0,
  });

  const fetchMetrics = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics`);
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="bg-black border border-blue-400 text-white p-4 rounded-2xl shadow-xl mb-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">🧠 System Metrics Overview</h2>
      <p>📈 Total Predictions: <span className="font-semibold">{metrics.total_predictions}</span></p>
      <p>🚀 Total Opportunities: <span className="font-semibold">{metrics.total_opportunities}</span></p>
      <p>🎯 Avg Confidence: <span className="text-green-400 font-semibold">{metrics.avg_confidence}%</span></p>
    </div>
  );
};
