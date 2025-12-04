import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sztteoxsxtpyvekfmvkr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dHRlb3hzeHRweXZla2ZtdmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDI2MDQsImV4cCI6MjA3OTcxODYwNH0.kC3Fv5RvQVHlshe52qRMt0qSVAGliQ9mttMnvtJsvjA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
