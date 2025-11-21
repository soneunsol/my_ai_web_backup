import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://puylxwomgfkeznysgrxz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eWx4d29tZ2ZrZXpueXNncnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0OTQ1MzgsImV4cCI6MjA3ODA3MDUzOH0.aPF8eeAFo23g9KRP_CJlQszb6WebF47NNrQjudGoeeo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
