create table if not exists public.feedback_score (
  id uuid primary key,
  asset text not null,
  loop_id uuid,
  predicted_sentiment text,
  predicted_score float,
  prediction_time timestamptz,
  actual_price_change float,
  actual_sentiment text,
  is_correct boolean,
  confidence_score float
);
