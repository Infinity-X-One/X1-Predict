// page.tsx

'use client';

import React from 'react';
import GlowingPredictionChart from '../components/GlowingPredictionChart';

export default function HomePage() {
  return (
    <main className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">InfinityXOS :: Sci-Fi Chart Demo</h1>
      <GlowingPredictionChart />
    </main>
  );
}


