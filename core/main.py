import React from 'react';

interface CopilotInsightBubbleProps {
  message: string;
}

export default function CopilotInsightBubble({ message }: CopilotInsightBubbleProps) {
  return (
    <div className="mt-4 p-4 bg-indigo-50 border border-indigo-300 rounded-lg shadow-sm animate-fade-in">
      <h3 className="text-sm font-medium text-indigo-800 mb-2">🤖 What Happened Here</h3>
      <p className="text-sm text-indigo-900 leading-relaxed">{message}</p>
    </div>
  );
}
