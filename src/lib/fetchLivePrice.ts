export const fetchLivePrice = async (symbol: string): Promise<number | null> => {
  const cryptoMap: Record<string, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    SOL: 'solana',
    DOGE: 'dogecoin',
    AVAX: 'avalanche-2'
  }

  if (cryptoMap[symbol]) {
    const id = cryptoMap[symbol]
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`

    try {
      const res = await fetch(url)
      const data = await res.json()
      return data[id]?.usd || null
    } catch (err) {
      console.error(`[fetchLivePrice] CoinGecko error for ${symbol}:`, err)
      return null
    }
  } else {
    const mockPrices: Record<string, number> = {
      AAPL: 190.32,
      NVDA: 722.45,
      SPY: 430.02,
      MSFT: 404.01,
      TSLA: 262.88,
    }
    return mockPrices[symbol] || null
  }
}
