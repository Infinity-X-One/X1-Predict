// src/app/admin/page.tsx
'use client';

import React, { useState } from 'react';

export default function AdminPage() {
  const [status, setStatus] = useState('');

  const runLoop = async () => {
    setStatus('Running loop...');
    const res = await fetch('/api/loop', { method: 'POST' });
    const data = await res.json();
    setStatus(data.status || 'Done');
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>🧠 InfinityX Admin Panel</h1>

      <button
        onClick={runLoop}
        style={{
          backgroundColor: '#0f172a',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        🚀 Run Prediction Loop
      </button>

      <div>Status: <strong>{status}</strong></div>
    </div>
  );
}
