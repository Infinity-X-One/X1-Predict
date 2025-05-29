'use client';

import { useEffect, useState } from 'react';

type Prediction = {
  asset: string;
  sentiment: string;
  score: number;
  timestamp: string;
};

export default function DashboardPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`);
      if (!res.ok) throw new Error('Failed to fetch predictions');
      const data = await res.json();
      setPredictions(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Auto-refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        📊 Prediction Dashboard
      </h1>

      <table className="w-full table-auto border border-gray-300 shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Asset</th>
            <th className="px-4 py-2 text-left">Sentiment</th>
            <th className="px-4 py-2 text-left">Score</th>
            <th className="px-4 py-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : predictions.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No data available.
              </td>
            </tr>
          ) : (
            predictions.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2 font-medium">{p.asset}</td>
                <td className="px-4 py-2 capitalize">{p.sentiment}</td>
                <td className="px-4 py-2">{(p.score * 100).toFixed(1)}%</td>
                <td className="px-4 py-2">
                  {new Date(p.timestamp).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}

