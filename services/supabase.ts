
import { createClient } from '@supabase/supabase-js';

// Credentials provided by the user
const supabaseUrl = 'https://glcjvbuagdxejficsoql.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsY2p2YnVhZ2R4ZWpmaWNzb3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNjM0MjYsImV4cCI6MjA4MDkzOTQyNn0.nQYdUTBmsAn13tBDN5x4i8gfihD4xtWVkQioA0zWoJU';

export const supabase = createClient(supabaseUrl, supabaseKey);
