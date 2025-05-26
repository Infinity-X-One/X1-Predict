// 💰 PaperTrade.ts
// Logs mock trades into an in-memory array. Expandable to Supabase.

type Trade = {
  symbol: string
  prediction: number
  buyPrice: number
  timestamp: string
}

let tradeLog: Trade[] = []

export const placePaperTrade = (
  symbol: string,
  prediction: number,
  buyPrice: number
) => {
  const newTrade: Trade = {
    symbol,
    prediction,
    buyPrice,
    timestamp: new Date().toISOString()
  }

  tradeLog.push(newTrade)
  console.log('[📝 PaperTrade Log]', newTrade)
}

export const getTradeLog = (): Trade[] => {
  return tradeLog
}
