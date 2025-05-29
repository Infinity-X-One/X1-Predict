interface DataPoint {
  date: string;
  value: number;
}

export function detectMilestones(data: DataPoint[]) {
  const highs: number[] = [];
  const lows: number[] = [];

  for (let i = 1; i < data.length - 1; i++) {
    const prev = data[i - 1].value;
    const curr = data[i].value;
    const next = data[i + 1].value;

    if (curr > prev && curr > next) {
      highs.push(i);
    }

    if (curr < prev && curr < next) {
      lows.push(i);
    }
  }

  return { highs, lows };
}
