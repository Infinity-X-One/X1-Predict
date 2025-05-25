-- supabase_schema.sql

CREATE TABLE IF NOT EXISTS public.predictions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asset TEXT NOT NULL,
    sentiment TEXT NOT NULL,
    score DOUBLE PRECISION NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    loop_id UUID,
    source TEXT,
    tags TEXT[],
    raw_prompt TEXT
);
