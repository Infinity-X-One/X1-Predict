// 🧾 TradeHistoryStorage.ts
// Stores, retrieves, and clears all paper trades

type Trade = {
  symbol: string
  prediction: number
  buyPrice: number
  timestamp: string
}

let storedTrades: Trade[] = []

export const saveTrade = (trade: Trade) => {
  storedTrades.push(trade)
  console.log('[🧾 Saved Trade]', trade)
}

export const getStoredTrades = (): Trade[] => {
  return storedTrades
}

export const clearStoredTrades = () => {
  storedTrades = []
  console.log('[🧹 Trade history cleared]')
}
