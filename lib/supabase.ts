import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fbhsnkvofodduqdxtuxq.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiaHNua3ZvZm9kZHVxZHh0dXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxODAzMzYsImV4cCI6MjA0Mjc1NjMzNn0.RBzlBfiVd9mLRxpt7P-XbfC7wOy6X0bcfCWspj-NqC8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})