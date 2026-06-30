import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sua-url-do-supabase.supabase.co';
const supabaseKey = 'sua-chave-anon-publica';

export const supabase = createClient(supabaseUrl, supabaseKey);