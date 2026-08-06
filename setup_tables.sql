-- Robotuy Database Schema

-- 1. Modules
CREATE TABLE IF NOT EXISTS cb_modules (
  id SERIAL PRIMARY KEY,
  module_number INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_sk TEXT
);

-- 2. Lessons
CREATE TABLE IF NOT EXISTS cb_lessons (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES cb_modules(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_sk TEXT,
  lesson_type TEXT NOT NULL DEFAULT 'theory',
  introduction TEXT,
  learning_content TEXT,
  interesting_facts TEXT,
  real_world TEXT,
  key_takeaways JSONB DEFAULT '[]',
  challenge TEXT,
  common_mistakes TEXT,
  best_practices TEXT
);

-- 3. Quiz Questions
CREATE TABLE IF NOT EXISTS cb_quiz_questions (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER NOT NULL REFERENCES cb_lessons(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL DEFAULT 1,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'mcq',
  correct_answer TEXT NOT NULL,
  code_snippet TEXT,
  explanation TEXT,
  explanation_sk TEXT
);

-- 4. Quiz Options
CREATE TABLE IF NOT EXISTS cb_quiz_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES cb_quiz_questions(id) ON DELETE CASCADE,
  option_label TEXT NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false
);

-- 5. User State
CREATE TABLE IF NOT EXISTS user_state (
  user_id UUID PRIMARY KEY,
  display_name TEXT DEFAULT 'User',
  xp INTEGER DEFAULT 0,
  gems INTEGER DEFAULT 0,
  hearts INTEGER DEFAULT 5,
  streak INTEGER DEFAULT 0,
  last_active_date TEXT,
  byte_mood TEXT DEFAULT 'happy',
  byte_battery INTEGER DEFAULT 100,
  completed_lessons JSONB DEFAULT '[]',
  badges JSONB DEFAULT '[]',
  weekly_xp INTEGER DEFAULT 0,
  week_start_date TEXT,
  owned_items JSONB DEFAULT '[]',
  equipment JSONB DEFAULT '{}',
  selected_topics JSONB DEFAULT '[]',
  coffees INTEGER DEFAULT 0,
  fav_drink TEXT,
  subscription_status TEXT DEFAULT 'free',
  subscription_plan TEXT,
  subscription_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  promo_code_used TEXT,
  push_token TEXT,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Promo Codes
CREATE TABLE IF NOT EXISTS promo_codes (
  code TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'free_month',
  uses_left INTEGER,
  active BOOLEAN NOT NULL DEFAULT true
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lessons_module ON cb_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_lesson ON cb_quiz_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_options_question ON cb_quiz_options(question_id);
CREATE INDEX IF NOT EXISTS idx_user_state_stripe ON user_state(stripe_customer_id);

-- RLS Policies
ALTER TABLE cb_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE cb_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE cb_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cb_quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Public read for curriculum
CREATE POLICY "Public read cb_modules" ON cb_modules FOR SELECT USING (true);
CREATE POLICY "Public read cb_lessons" ON cb_lessons FOR SELECT USING (true);
CREATE POLICY "Public read cb_quiz_questions" ON cb_quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public read cb_quiz_options" ON cb_quiz_options FOR SELECT USING (true);

-- User state: users can read/write their own row
CREATE POLICY "Users read own state" ON user_state FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own state" ON user_state FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own state" ON user_state FOR UPDATE USING (auth.uid() = user_id);

-- Anon can read user_state for leaderboard (only display_name + xp)
CREATE POLICY "Anon read leaderboard" ON user_state FOR SELECT TO anon USING (true);

-- Promo codes: public read for validation
CREATE POLICY "Public read promo_codes" ON promo_codes FOR SELECT USING (true);
