'use client';

import { useState } from 'react';
import { finSynapse } from '@/ai/FinSynapse';

export default function PromptBar() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let reply = '';

    const [command, ...rest] = input.toLowerCase().split(' ');
    const args = rest.join(' ');

    switch (command) {
      case 'predict':
        reply = finSynapse.receivePrediction('BTC', 39000, 38200); // mock
        break;
      case 'proof':
        reply = finSynapse.getProof();
        break;
      case 'buy':
        reply = finSynapse.executePaperTrade(args || 'BTC', 100, 'buy');
        break;
      case 'sell':
        reply = finSynapse.executePaperTrade(args || 'BTC', 100, 'sell');
        break;
      case 'report':
        reply = finSynapse.report();
        break;
      default:
        reply = '🤖 Unknown command. Try: predict, buy, sell, proof, report';
    }

    setResponse(reply);
    setInput('');
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-black text-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-2 bg-gray-800 rounded text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command like: predict, buy, sell, proof"
        />
        <button type="submit" className="bg-white text-black px-4 py-2 rounded">
          Send
        </button>
      </form>
      {response && (
        <pre className="mt-4 p-2 bg-gray-900 rounded text-sm whitespace-pre-wrap">
          {response}
        </pre>
      )}
    </div>
  );
}
