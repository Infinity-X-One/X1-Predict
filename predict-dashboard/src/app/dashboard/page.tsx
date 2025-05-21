// src/app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";

type Prediction = {
  asset: string;
  sentiment: string;
  score: number;
  timestamp: string;
  loop_id: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://x1-predict.onrender.com/predict")
      .then((res) => res.json())
      .then((data: Prediction[]) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 Prediction Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading predictions...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Asset</th>
              <th className="border px-4 py-2 text-left">Sentiment</th>
              <th className="border px-4 py-2 text-left">Score</th>
              <th className="border px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.loop_id}>
                <td className="border px-4 py-2">{item.asset}</td>
                <td className="border px-4 py-2">{item.sentiment}</td>
                <td className="border px-4 py-2">{item.score}</td>
                <td className="border px-4 py-2">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
