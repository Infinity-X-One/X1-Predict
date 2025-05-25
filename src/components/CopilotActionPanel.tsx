import React, { useState } from 'react';
import axios from 'axios';
import CopilotMessage from './CopilotMessage';
import { sendFeedback } from '../hooks/useSendFeedback';

export default function CopilotActionPanel() {
  const [copilotPrompt, setCopilotPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTicker, setCurrentTicker] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleGetPredictions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/predict');
      const top = res.data.predictions?.[0];

      if (top) {
        const msg = `📈 Based on our latest signal, I'm detecting potential in $${top.ticker}. Confidence: ${top.confidence_score}%. ${top.reason}`;
        setCopilotPrompt(msg);
        setCurrentTicker(top.ticker);
        setShowFeedback(true);
      } else {
        setCopilotPrompt("🤖 No strong signals detected at the moment. Monitoring for changes...");
        setShowFeedback(false);
      }
    } catch (err) {
      console.error("Prediction fetch failed", err);
      setCopilotPrompt("⚠️ I couldn’t fetch predictions. Please check the connection to the backend.");
      setShowFeedback(false);
    }
    setLoading(false);
  };

  const handleFeedback = async (result: 'good' | 'bad') => {
    if (!currentTicker) return;
    const response = await sendFeedback(currentTicker, result);
    setCopilotPrompt(response);
    setShowFeedback(false);
  };

  return (
    <div className="p-4 bg-gray-50 border rounded mt-6">
      <h2 className="text-md font-semibold mb-2">🧠 Copilot Assistant</h2>
      <div className="flex gap-3 mb-3">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          onClick={handleGetPredictions}
          disabled={loading}
        >
          {loading ? "Scanning..." : "Get Live Prediction"}
        </button>
      </div>

      {copilotPrompt && <CopilotMessage message={copilotPrompt} />}

      {showFeedback && (
        <div className="flex gap-2 mt-3">
          <button
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => handleFeedback('good')}
          >
            👍 Good Signal
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleFeedback('bad')}
          >
            👎 Bad Signal
          </button>
        </div>
      )}
    </div>
  );
}
