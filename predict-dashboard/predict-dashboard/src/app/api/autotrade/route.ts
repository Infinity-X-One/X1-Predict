import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Add GET route to test in browser
export async function GET() {
  return NextResponse.json({ message: 'Autotrade API is online. Use POST to simulate trades.' });
}

export async function POST() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`);
    const predictions = await res.json();

    let added = 0;

    for (const item of predictions) {
      const { asset, sentiment, score, timestamp, loop_id, source, tags, raw_prompt } = item;

      const { error } = await supabase.from('paper_trades').insert([
        {
          asset,
          sentiment,
          score,
          timestamp,
          loop_id,
          source,
          tags,
          raw_prompt,
          strategy: 'auto',
          status: 'open',
        },
      ]);

      if (!error) added++;
    }

    return NextResponse.json({ added });
  } catch (err) {
    console.error('AutoTrade Error:', err);
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  }
}


