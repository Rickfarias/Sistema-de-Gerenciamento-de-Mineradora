import { supabase } from '../supabaseClient.js'

export const FuncionarioModel = {
  findAll: async () => {
    const { data, error } = await supabase.from('funcionario').select('*').order('nome', { ascending: true })
    if (error) throw error; return data
  },
  findById: async (id) => {
    const { data, error } = await supabase.from('funcionario').select('*').eq('id', id).single()
    if (error) throw error; return data
  },
  create: async ({ nome, cpf, cargo, email, cidade_id }) => {
    const { data, error } = await supabase.from('funcionario').insert([{ nome, cpf, cargo, email, cidade_id }]).select().single()
    if (error) throw error; return data
  },
  update: async (id, { nome, cpf, cargo, email, cidade_id }) => {
    const { data, error } = await supabase.from('funcionario').update({ nome, cpf, cargo, email, cidade_id }).eq('id', id).select().single()
    if (error) throw error; return data
  },
  remove: async (id) => {
    const { data, error } = await supabase.from('funcionario').delete().eq('id', id).select('id').single()
    if (error) throw error; return data
  }
}