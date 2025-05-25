// MilestoneChart.tsx

'use client';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useChartBacktrace } from '../hooks/useChartBacktrace';
import CopilotInsightBubble from './CopilotInsightBubble';
import { detectMilestones } from '../utils/detectMilestones';

interface MilestoneChartProps {
  dataPoints: { date: string; value: number }[];
  asset: string;
}

export default function MilestoneChart({ dataPoints, asset }: MilestoneChartProps) {
  const [copilotText, setCopilotText] = useState<string | null>(null);
  const { fetchBacktrace } = useChartBacktrace();

  const handlePointClick = async ({ index }: { index: number }) => {
    const date = dataPoints[index].date;
    const insight = await fetchBacktrace(asset, date);
    setCopilotText(insight);
  };

  const { highs = [], lows = [] } = detectMilestones(dataPoints) || {};

  const pointStyles = dataPoints.map((_, idx) => {
    if (Array.isArray(highs) && highs.includes(idx)) return 'triangle';
    if (Array.isArray(lows) && lows.includes(idx)) return 'rect';
    return 'circle';
  });

  const chartData = {
    labels: dataPoints.map(d => d.date),
    datasets: [
      {
        label: `${asset} Price`,
        data: dataPoints.map(d => d.value),
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        pointBackgroundColor: '#3B82F6',
        pointStyle: pointStyles,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    onClick: (event: any, activeElements: any[]) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        handlePointClick({ index });
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `Price: $${context.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">📈 Milestone Impact Chart</h2>
      <Line data={chartData} options={chartOptions as any} />
      {copilotText && <CopilotInsightBubble message={copilotText} />}
    </div>
  );
}
