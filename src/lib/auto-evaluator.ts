'use server';
import { supabase } from './supabase';

export async function evaluateTrades() {
  const { data: trades } = await supabase.from('paper_trades').select('*').is('outcome', null);

  for (const trade of trades || []) {
    const currentPrice = Math.random() * 100 + 100;
    let outcome: 'win' | 'loss' | 'neutral' = 'neutral';

    const diff = currentPrice - trade.price_entry;
    if (diff > 5) outcome = 'win';
    else if (diff < -5) outcome = 'loss';

    await supabase.from('paper_trades').update({ price_exit: currentPrice, outcome }).eq('id', trade.id);
  }
}
