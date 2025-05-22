'use server';
import { supabase } from './supabase';

export async function autoTrade() {
  const { data } = await supabase.from('predictions').select('*').order('timestamp', { ascending: false }).limit(5);

  for (const prediction of data || []) {
    if (prediction.score > 0.9) {
      await supabase.from('paper_trades').insert({
        asset: prediction.asset,
        price_entry: Math.random() * 100 + 100,
        sentiment: prediction.sentiment,
        loop_id: prediction.loop_id,
      });
    }
  }
}

