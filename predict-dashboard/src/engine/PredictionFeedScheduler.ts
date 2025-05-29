// 🔁 PredictionFeedScheduler.ts
// Runs WinnerEngine and logs predictions every cycle

import { getTopWinners } from './WinnerEngine'
import { fetchLivePrice } from '@/lib/fetchLivePrice'
import { placePaperTrade } from './PaperTrade'
import { saveTradeToSupabase } from './TradeHistoryStorageSupabase'

// 🔁 Manual run (one cycle)
export const runPredictionCycle = async () => {
  console.log('⏱️ [Cycle] Starting prediction run...')
  const winners = await getTopWinners()

  for (const winner of winners) {
    const current = await fetchLivePrice(winner.symbol)
    if (!current) {
      console.warn(`[❌ Skip] No price for ${winner.symbol}`)
      continue
    }

    // Simulate paper trade
    placePaperTrade(winner.symbol, winner.prediction, current)

    // Save to Supabase
    await saveTradeToSupabase({
      symbol: winner.symbol,
      prediction: winner.prediction,
      buyPrice: current,
      timestamp: new Date().toISOString()
    })

    console.log(`[✅ Trade] ${winner.symbol} | Predicted: $${winner.prediction} | Bought: $${current}`)
  }

  console.log('✅ [Cycle] Prediction run complete.\n')
}

// 🔄 Auto-run every 15 minutes (can adjust timing)
const AUTO_INTERVAL_MS = 15 * 60 * 1000 // 15 mins

export const startAutoPredictionLoop = () => {
  console.log('🌀 Auto prediction loop started (every 15 minutes)...')
  runPredictionCycle()
  setInterval(runPredictionCycle, AUTO_INTERVAL_MS)
}
