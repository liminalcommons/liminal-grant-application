-- ============================================
-- LIMINAL GRANT APPLICATION - SUPABASE SCHEMA
-- ============================================
-- Run this SQL in your Supabase SQL Editor to create the necessary table

-- Create the whitepaper_submissions table
CREATE TABLE IF NOT EXISTS whitepaper_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- User info (from Clerk)
  user_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,

  -- Whitepaper content
  title TEXT NOT NULL,
  whitepaper_content TEXT NOT NULL,

  -- Status tracking
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'funded')),

  -- Admin notes (for internal use)
  admin_notes TEXT,
  reviewer_id TEXT
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON whitepaper_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON whitepaper_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON whitepaper_submissions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE whitepaper_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read submissions (for the public showcase)
CREATE POLICY "Public read access for submissions"
  ON whitepaper_submissions
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert their own submissions
CREATE POLICY "Users can insert own submissions"
  ON whitepaper_submissions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own submissions (while in 'submitted' status)
CREATE POLICY "Users can update own pending submissions"
  ON whitepaper_submissions
  FOR UPDATE
  USING (status = 'submitted')
  WITH CHECK (status = 'submitted');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_whitepaper_submissions_updated_at
  BEFORE UPDATE ON whitepaper_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================
-- Uncomment the following to add sample submissions for testing

/*
INSERT INTO whitepaper_submissions (user_id, user_email, user_name, title, whitepaper_content, status) VALUES
(
  'sample_user_1',
  'demo@example.com',
  'Demo User',
  'AquaGuard: Decentralized AI Water Quality Monitoring for Rural Communities',
  '## Abstract

AquaGuard democratizes water quality monitoring using decentralized AI inference on SingularityNET, ensuring that communities worldwide have access to clean water data without corporate gatekeeping.

## The Problem

Over 2 billion people lack access to safely managed drinking water. Current water testing is expensive and centralized, creating information asymmetries that harm vulnerable communities.

## The Centralization Trap

If Big Tech solves this, they will:
- Own all water quality data
- Charge subscription fees for access
- Create vendor lock-in for communities

## The BGI Solution

AquaGuard provides open, decentralized water monitoring with:
- AI-powered sensor analysis on SingularityNET
- Data marketplace on Ocean Protocol
- Autonomous alerts via Fetch.ai Agents

## Budget: $48,500

- Milestone 1: Design & Sensor Integration ($10k)
- Milestone 2: AI Model Development ($15k)
- Milestone 3: SNET Integration ($15k)
- Milestone 4: Community Pilot ($8.5k)',
  'submitted'
),
(
  'sample_user_2',
  'innovator@example.com',
  'AI Innovator',
  'FarmSense: Decentralized Crop Disease Detection for Smallholder Farmers',
  '## Abstract

FarmSense empowers smallholder farmers with AI-powered crop disease detection, running entirely on decentralized infrastructure to prevent Big Ag monopolization of agricultural AI.

## The Problem

Crop diseases cause $220 billion in annual losses globally, disproportionately affecting small farmers who lack access to expert diagnosis.

## The Solution

A mobile-first app that uses decentralized AI to:
- Identify crop diseases from photos
- Recommend organic treatments
- Connect farmers to local experts

## Budget: $47,000

- Milestone 1: Dataset curation ($12k)
- Milestone 2: Model training ($15k)
- Milestone 3: Mobile app + SNET ($15k)
- Milestone 4: Farmer trials ($5k)',
  'under_review'
);
*/
