-- Robotuy Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Modules table
CREATE TABLE IF NOT EXISTS cb_modules (
  id SERIAL PRIMARY KEY,
  module_number INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_sk TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lessons table
CREATE TABLE IF NOT EXISTS cb_lessons (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES cb_modules(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_sk TEXT,
  lesson_type TEXT DEFAULT 'theory',
  introduction TEXT,
  introduction_sk TEXT,
  learning_content TEXT,
  learning_content_sk TEXT,
  interesting_facts TEXT,
  interesting_facts_sk TEXT,
  real_world TEXT,
  real_world_sk TEXT,
  key_takeaways TEXT[],
  key_takeaways_sk TEXT[],
  challenge TEXT,
  challenge_sk TEXT,
  common_mistakes TEXT,
  common_mistakes_sk TEXT,
  best_practices TEXT,
  best_practices_sk TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(module_id, lesson_number)
);

-- Quiz questions table
CREATE TABLE IF NOT EXISTS cb_quiz_questions (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES cb_lessons(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_text_sk TEXT,
  question_type TEXT NOT NULL DEFAULT 'mcq', -- 'mcq', 'true_false', 'fill', 'write_code'
  correct_answer TEXT NOT NULL,
  correct_answer_sk TEXT,
  code_snippet TEXT,
  explanation TEXT,
  explanation_sk TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz options table (for MCQ questions)
CREATE TABLE IF NOT EXISTS cb_quiz_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES cb_quiz_questions(id) ON DELETE CASCADE,
  option_label TEXT NOT NULL, -- 'A', 'B', 'C', 'D'
  option_text TEXT NOT NULL,
  option_text_sk TEXT,
  is_correct BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE cb_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE cb_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE cb_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cb_quiz_options ENABLE ROW LEVEL SECURITY;

-- Allow read access for anon users
CREATE POLICY "Allow read cb_modules" ON cb_modules FOR SELECT USING (true);
CREATE POLICY "Allow read cb_lessons" ON cb_lessons FOR SELECT USING (true);
CREATE POLICY "Allow read cb_quiz_questions" ON cb_quiz_questions FOR SELECT USING (true);
CREATE POLICY "Allow read cb_quiz_options" ON cb_quiz_options FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON cb_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_lesson_id ON cb_quiz_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quiz_options_question_id ON cb_quiz_options(question_id);
CREATE INDEX IF NOT EXISTS idx_modules_module_number ON cb_modules(module_number);
