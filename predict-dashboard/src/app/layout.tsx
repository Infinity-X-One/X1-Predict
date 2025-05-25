// src/app/layout.tsx
import '../styles/globals.css';
import '../lib/autoloop';
import '../lib/auto-evaluator';
import { ReactNode } from 'react';

export const metadata = {
  title: 'X1 Predict',
  description: 'Autonomous financial prediction and paper trading system.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
