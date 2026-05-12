import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'student' | 'teacher';

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  standard: string;
  batch: string;
  division: string;
  rollNumber: string;
  role: UserRole;
}

export interface TeacherRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
