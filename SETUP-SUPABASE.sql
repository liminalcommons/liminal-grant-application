-- ============================================
-- LIMINAL GRANT APPLICATION - SUPABASE SETUP
-- Copy and paste this entire file into Supabase SQL Editor
-- ============================================

-- Create the whitepaper_submissions table
CREATE TABLE IF NOT EXISTS whitepaper_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  title TEXT NOT NULL,
  whitepaper_content TEXT NOT NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'funded')),
  admin_notes TEXT,
  reviewer_id TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON whitepaper_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON whitepaper_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON whitepaper_submissions(created_at DESC);

-- Row Level Security
ALTER TABLE whitepaper_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate
DROP POLICY IF EXISTS "Public read access" ON whitepaper_submissions;
DROP POLICY IF EXISTS "Users can insert" ON whitepaper_submissions;
DROP POLICY IF EXISTS "Users can update pending" ON whitepaper_submissions;

CREATE POLICY "Public read access" ON whitepaper_submissions FOR SELECT USING (true);
CREATE POLICY "Users can insert" ON whitepaper_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update pending" ON whitepaper_submissions FOR UPDATE USING (status = 'submitted');

-- Updated_at trigger (drop first if exists)
DROP TRIGGER IF EXISTS update_whitepaper_submissions_updated_at ON whitepaper_submissions;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_whitepaper_submissions_updated_at
  BEFORE UPDATE ON whitepaper_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
