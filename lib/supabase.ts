import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client for development when env vars are missing
const createMockClient = () => ({
  auth: {
    signUp: async () => ({
      data: null,
      error: { message: "Supabase not configured. Please add environment variables." },
    }),
    signInWithPassword: async () => ({
      data: null,
      error: { message: "Supabase not configured. Please add environment variables." },
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
  },
})

// Only create real Supabase client if both environment variables exist
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : (createMockClient() as any)

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Debug logging to help identify the issue
if (typeof window !== "undefined") {
  console.log("Supabase URL exists:", !!supabaseUrl)
  console.log("Supabase Anon Key exists:", !!supabaseAnonKey)
  console.log("Supabase configured:", isSupabaseConfigured)
}
