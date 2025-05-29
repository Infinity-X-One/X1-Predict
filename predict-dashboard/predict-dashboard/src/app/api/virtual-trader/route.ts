import { supabase } from '@/lib/supabase'

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`)
  const predictions = await res.json()

  const { data: assets } = await supabase.from('track_assets').select('symbol').eq('enabled', true)
  const validAssets = assets?.map(a => a.symbol)

  const filtered = predictions.filter((p: any) => {
    return validAssets?.includes(p.asset) && p.score >= 0.91
  })

  for (const pred of filtered) {
    const price = await fetch(`https://finnhub.io/api/v1/quote?symbol=${pred.asset}`, {
      headers: {
        'X-Finnhub-Token': process.env.NEXT_PUBLIC_FINNHUB_API_KEY!,
      },
    }).then(r => r.json()).then(d => d.c)

    await supabase.from('paper_trades').insert({
      asset: pred.asset,
      sentiment: pred.sentiment,
      confidence: pred.score,
      price_entry: price,
      outcome: 'pending',
    })
  }

  return Response.json({ status: 'trades created', count: filtered.length })
}
