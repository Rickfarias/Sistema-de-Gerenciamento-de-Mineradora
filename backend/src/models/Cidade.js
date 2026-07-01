import { supabase } from '../supabaseClient.js'

export const CidadeModel = {
  findAll: async () => {
    const { data, error } = await supabase.from('cidade').select('*').order('nome', { ascending: true })
    if (error) throw error; return data
  },
  findById: async (id) => {
    const { data, error } = await supabase.from('cidade').select('*').eq('id', id).single()
    if (error) throw error; return data
  },
  create: async ({ nome, estado, cep }) => {
    const { data, error } = await supabase.from('cidade').insert([{ nome, estado, cep }]).select().single()
    if (error) throw error; return data
  },
  update: async (id, { nome, estado, cep }) => {
    const { data, error } = await supabase.from('cidade').update({ nome, estado, cep }).eq('id', id).select().single()
    if (error) throw error; return data
  },
  remove: async (id) => {
    const { data, error } = await supabase.from('cidade').delete().eq('id', id).select('id').single()
    if (error) throw error; return data
  }
}