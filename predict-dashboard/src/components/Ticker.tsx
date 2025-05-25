'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function Ticker() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('paper_trades')
        .select('*')
        .not('outcome', 'is', null)
        .order('closed_at', { ascending: false })
        .limit(5)

      setData(data || [])
    }

    load()
  }, [])

  return (
    <div className="w-full bg-black text-green-400 p-2 font-mono text-sm overflow-x-scroll whitespace-nowrap">
      {data.map((t, i) => (
        <span key={i} className="mr-6">
          {t.asset}: {t.outcome.toUpperCase()} @ {t.price_exit?.toFixed(2)}
        </span>
      ))}
    </div>
  )
}
