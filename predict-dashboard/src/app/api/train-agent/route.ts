import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data: trades } = await supabase
    .from('paper_trades')
    .select('*')
    .not('outcome', 'is', null)

  const byScore = trades?.reduce((acc, t) => {
    const bucket = Math.floor(t.confidence * 100)
    acc[bucket] = acc[bucket] || { win: 0, total: 0 }
    acc[bucket].total++
    if (t.outcome === 'win') acc[bucket].win++
    return acc
  }, {} as Record<number, { win: number; total: number }>)

  await supabase
    .from('agent_memory')
    .upsert({ key: 'score_stats', value: byScore })

  return Response.json({ status: 'memory updated', byScore })
}
