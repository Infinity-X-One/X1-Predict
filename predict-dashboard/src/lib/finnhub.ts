export async function getPrice(symbol: string): Promise<number | null> {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
      {
        headers: {
          'X-Finnhub-Token': process.env.NEXT_PUBLIC_FINNHUB_API_KEY!,
        },
      }
    )
    const data = await response.json()
    return data.c ?? null
  } catch (err) {
    console.error('Finnhub price error:', err)
    return null
  }
}

