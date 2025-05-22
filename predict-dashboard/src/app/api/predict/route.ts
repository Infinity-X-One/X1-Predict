// src/app/api/predict/route.ts

export async function GET() {
  const predictions = [
    {
      asset: 'AAPL',
      sentiment: 'neutral',
      score: 0.929,
    },
    {
      asset: 'TSLA',
      sentiment: 'positive',
      score: 0.916,
    },
    {
      asset: 'BTC',
      sentiment: 'negative',
      score: 0.882,
    },
  ];

  return Response.json(predictions);
}
