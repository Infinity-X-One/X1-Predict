export async function getStats() {
  return {
    accuracy: 0.74,
    wins: 115,
    losses: 40,
    updated: new Date().toISOString(),
  }
}
