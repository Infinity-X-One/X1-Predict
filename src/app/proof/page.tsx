'use client';

import React, { useEffect, useState } from 'react';

export default function ProofPage() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`);
      const data = await res.json();
      setPredictions(data.slice(0, 10));
    } catch (err) {
      console.error('Error fetching predictions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">🧠 Proof Dashboard</h1>

      {loading ? (
        <p className="text-center">Loading predictions...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.map((p, i) => (
            <div key={i} className="bg-black border border-gray-700 p-4 rounded-xl">
              <p>📈 <strong>{p.asset}</strong> - {p.sentiment} ({p.score})</p>
              <p className="text-sm text-gray-400">{new Date(p.timestamp).toLocaleTimeString()}</p>
              <p className="text-xs mt-1 italic">Prompt: {p.raw_prompt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
