import { supabase } from '../services/supabase';

export const cidadeService = {
  listar: async () => {
    const { data, error } = await supabase.from('cidades').select('*');
    if (error) throw error;
    return data;
  }
};