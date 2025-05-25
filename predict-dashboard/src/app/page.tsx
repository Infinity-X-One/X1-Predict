'use client';

import { useEffect, useState } from 'react';

type Prediction = {
  asset: string;
  sentiment: string;
  score: number;
};

export default function Home() {
  const [data, setData] = useState<Prediction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/predict', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📈 FinBERT Predictions</h1>

      {error && (
        <div style={{ color: 'red', marginTop: 20 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!error && data.length === 0 && <p>Loading predictions...</p>}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: '#f9f9f9',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem 0' }}>🧠 {item.asset}</h2>
            <p>
              <strong>Sentiment:</strong> {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
            </p>
            <p>
              <strong>Score:</strong> {(item.score * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}


