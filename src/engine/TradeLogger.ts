import { getTradeLog } from './PaperTrade'
import { fetchLivePrice } from '@/lib/fetchLivePrice'

type EvaluatedTrade = {
  symbol: string
  prediction: number
  buyPrice: number
  currentPrice: number
  result: 'WIN' | 'LOSS'
  confidence: number
  timestamp: string
}

export const evaluateTrades = async (): Promise<EvaluatedTrade[]> => {
  const trades = getTradeLog()
  const evaluated: EvaluatedTrade[] = []

  for (const trade of trades) {
    const current = await fetchLivePrice(trade.symbol)
    if (!current) continue

    const correctDirection = (trade.prediction > trade.buyPrice && current > trade.buyPrice)
      || (trade.prediction < trade.buyPrice && current < trade.buyPrice)

    evaluated.push({
      symbol: trade.symbol,
      prediction: trade.prediction,
      buyPrice: trade.buyPrice,
      currentPrice: current,
      confidence: Math.abs(trade.prediction - trade.buyPrice) / trade.buyPrice,
      result: correctDirection ? 'WIN' : 'LOSS',
      timestamp: trade.timestamp
    })
  }

  return evaluated
}
