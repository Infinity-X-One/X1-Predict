'use client';

import { useEffect, useState } from 'react';
import PromptBar from '@/components/PromptBar';
import PortfolioPanel from '@/components/PortfolioPanel';
import useUser from '@/hooks/useUser';
import { fetchPrediction } from '@/lib/fetchPrediction';
import { finSynapse } from '@/ai/FinSynapse';

export default function DashboardPage() {
  const { user, loading, error } = useUser();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPrediction = async () => {
      const data = await fetchPrediction();
      if (!data) return;

      const first = data[0];
      const predictionMsg = finSynapse.receivePrediction(
        first.asset,
        first.score * 100, // Mock predicted price
        100                // Static current price (for now)
      );
      setMessage(predictionMsg);
    };

    loadPrediction();
  }, []);

  if (loading) return <p className="text-white p-8">🔄 Loading your session...</p>;
  if (error) return <p className="text-red-500 p-8">❌ Error: {error.message}</p>;
  if (!user) return <p className="text-yellow-400 p-8">🔒 Please sign in to access your dashboard.</p>;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">
        👋 Welcome, {user.email?.split('@')[0]} — Your FinSynapse is Online.
      </h1>

      {message && (
        <div className="bg-gray-800 p-4 rounded mb-4 text-green-400 text-sm shadow">
          {message}
        </div>
      )}

      <PromptBar />
      <PortfolioPanel />
    </main>
  );
}
