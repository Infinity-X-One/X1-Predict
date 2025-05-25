// lib/getStats.ts

export const getFeedbackStats = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback_log`);
    const data = await res.json();

    const total = data.length;
    const correct = data.filter((d: any) => d.was_correct).length;
    const streak = calculateStreak(data);

    const accuracy = total ? Math.round((correct / total) * 100) : 0;

    return { accuracy, streak };
  } catch (err) {
    console.error('Error fetching feedback stats:', err);
    return { accuracy: 0, streak: 0 };
  }
};

const calculateStreak = (entries: any[]) => {
  let streak = 0;
  for (let i = entries.length - 1; i >= 0; i--) {
    if (entries[i].was_correct) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};
