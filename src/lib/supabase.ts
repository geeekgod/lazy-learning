
import { env } from '@/env.mjs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export {
  supabase,
  nextAuthClient,
}


// create next-auth supabase client

const nextAuthClient = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
)
