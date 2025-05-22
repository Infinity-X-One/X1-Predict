import { supabase } from '@/lib/supabase'
import { getPrice } from '@/lib/finnhub'

export async function GET() {
  const { data: open } = await supabase
    .from('paper_trades')
    .select('*')
    .eq('outcome', 'pending')

  for (const trade of open ?? []) {
    const current = await getPrice(trade.asset)
    if (!current || !trade.price_entry) continue

    const result =
      current > trade.price_entry * 1.01
        ? 'win'
        : current < trade.price_entry * 0.99
        ? 'loss'
        : 'neutral'

    await supabase
      .from('paper_trades')
      .update({
        price_exit: current,
        closed_at: new Date().toISOString(),
        outcome: result,
      })
      .eq('id', trade.id)
  }

  return Response.json({ status: 'trades evaluated', count: open?.length })
}
