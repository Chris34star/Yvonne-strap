/*
# Create shared_answers table (single-tenant, no auth)

1. New Tables
- `shared_answers`
  - `id` (uuid, primary key)
  - `answers` (jsonb, stores all of Yvone's answers as a JSON object)
  - `question_for_chris` (text, optional - the question Yvone wants to ask Chris)
  - `final_response` (text, Yvone's response to "would you like to get to know each other")
  - `date_response` (text, optional - response to the date question)
  - `created_at` (timestamp)
2. Security
  - Enable RLS on `shared_answers`.
  - Allow anon + authenticated CRUD because this is a no-auth single-tenant app
    where Yvone explicitly chooses to share her answers.
3. Important Notes
  - This table only stores data when Yvone explicitly clicks "Share my answers with Chris"
  - No answers are sent without explicit consent
  - The app is single-tenant (one instance for Chris to send to Yvone)
*/

CREATE TABLE IF NOT EXISTS shared_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  question_for_chris text,
  final_response text,
  date_response text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shared_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_shared_answers" ON shared_answers;
CREATE POLICY "anon_select_shared_answers" ON shared_answers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_shared_answers" ON shared_answers;
CREATE POLICY "anon_insert_shared_answers" ON shared_answers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_shared_answers" ON shared_answers;
CREATE POLICY "anon_update_shared_answers" ON shared_answers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_shared_answers" ON shared_answers;
CREATE POLICY "anon_delete_shared_answers" ON shared_answers FOR DELETE
  TO anon, authenticated USING (true);
