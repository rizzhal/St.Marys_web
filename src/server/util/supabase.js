import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_SUPABASE_SECRET_KEY
const bucket = process.env.SUPABASE_BUCKET

if (!supabaseUrl || !supabaseKey || !bucket) {
  throw new Error('Missing SUPABASE_URL, SUPABASE_SECRET_KEY, or SUPABASE_BUCKET in environment')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
export const BUCKET = bucket
