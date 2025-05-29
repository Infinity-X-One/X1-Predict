// GlowingPredictionChart.tsx

'use client';
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const generateGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, 'rgba(0, 255, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 255, 255, 0.8)');
  return gradient;
};

const GlowingPredictionChart = () => {
  const chartRef = React.useRef<any>(null);

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: [10000, 10300, 10450, 10700, 11000, 11300, 11800],
        fill: true,
        backgroundColor: (ctx: any) =>
          ctx.chart ? generateGradient(ctx.chart.ctx, ctx.chart.chartArea) : 'rgba(0,255,255,0.3)',
        borderColor: '#00ffff',
        borderWidth: 2,
        pointRadius: 6,
        pointBackgroundColor: '#00ffff',
        pointHoverRadius: 10,
        pointHoverBackgroundColor: '#ffffff',
        tension: 0.4,
      },
      {
        label: 'AI Forecast',
        data: [null, null, null, 10700, 11200, 11800, 12400],
        borderColor: 'rgba(0,255,255,0.6)',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeOutQuint',
    },
    plugins: {
      legend: {
        labels: {
          color: '#00ffff',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(0,255,255,0.1)',
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(0,255,255,0.1)',
        },
      },
    },
  };

  return (
    <div className="bg-black p-6 rounded-2xl shadow-lg border border-cyan-400">
      <h2 className="text-white text-xl font-bold mb-4">🔮 Glowing Prediction Chart</h2>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default GlowingPredictionChart;
