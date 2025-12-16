import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our whitepaper submissions
export interface WhitepaperSubmission {
  id?: string
  created_at?: string
  user_id: string
  user_email: string
  user_name: string
  title: string
  whitepaper_content: string
  status: 'submitted' | 'under_review' | 'approved' | 'funded'
}
