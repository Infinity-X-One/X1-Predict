// 🧾 TradeHistoryStorageSupabase.ts
// Uses Supabase to store and retrieve all paper trades

import { supabase } from '@/lib/supabaseClient'

type Trade = {
  symbol: string
  prediction: number
  buyPrice: number
  timestamp: string
}

// ✅ Save a new trade
export const saveTradeToSupabase = async (trade: Trade) => {
  const { data, error } = await supabase
    .from('paper_trades')
    .insert([trade])

  if (error) {
    console.error('[❌ Supabase Insert Error]', error)
  } else {
    console.log('[✅ Trade Saved]', data)
  }
}

// ✅ Load trade history
export const getTradesFromSupabase = async (): Promise<Trade[]> => {
  const { data, error } = await supabase
    .from('paper_trades')
    .select('*')
    .order('timestamp', { ascending: false })

  if (error) {
    console.error('[❌ Supabase Fetch Error]', error)
    return []
  }

  return data || []
}

// ✅ Optional: clear history
export const clearTradeHistory = async () => {
  const { error } = await supabase
    .from('paper_trades')
    .delete()
    .neq('symbol', '') // delete all rows

  if (error) {
    console.error('[❌ Supabase Delete Error]', error)
  } else {
    console.log('[🧹 All trades cleared]')
  }
}
