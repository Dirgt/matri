import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uxiaqcojralkdetbtpqw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4aWFxY29qcmFsa2RldGJ0cHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3ODY5MjcsImV4cCI6MjEwMzM2MjkyN30.OXrjDin-6kU5vNOIPhvpuQcK-LWZ912hKBd-4cLWemw';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

