// detectMilestones.ts

type DataPoint = { date: string; value: number };

export function detectMilestones(data: DataPoint[]) {
  // TEMP: Mark any value > 90 as a milestone
  return data.filter((point) => point.value > 90);
}
