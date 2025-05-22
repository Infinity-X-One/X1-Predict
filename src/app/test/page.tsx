'use client';

import React from 'react';

export default function TestAutotrade() {
  const runTestTrade = async () => {
    const res = await fetch('/api/autotrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asset: 'AAPL',
        prediction_score: 0.91,
        sentiment: 'positive',
        price_entry: 184.25,
      }),
    });

    const result = await res.json();
    console.log(result);
    alert(JSON.stringify(result));
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🚀 Autotrade Test</h1>
      <button
        onClick={runTestTrade}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#22c55e',
          color: '#fff',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Simulate Trade
      </button>
    </main>
  );
}
