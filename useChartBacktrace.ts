import axios from 'axios';

export function useChartBacktrace() {
  const fetchBacktrace = async (asset: string, date: string): Promise<string> => {
    try {
      const res = await axios.get(`/event-trace`, {
        params: { asset, date }
      });

      return res.data?.insight || "🧠 No significant events recorded for that date.";
    } catch (err) {
      console.error("Backtrace fetch failed:", err);
      return "⚠️ Unable to retrieve chart backtrace at this time.";
    }
  };

  return { fetchBacktrace };
}
