import { supabase } from '../supabaseClient.js'

export const EquipamentoModel = {
  findAll: async () => {
    const { data, error } = await supabase.from('equipamento').select('*').order('nome', { ascending: true })
    if (error) throw error; return data
  },
  findById: async (id) => {
    const { data, error } = await supabase.from('equipamento').select('*').eq('id', id).single()
    if (error) throw error; return data
  },
  create: async ({ nome, tipo, numero_serie, status }) => {
    const { data, error } = await supabase.from('equipamento').insert([{ nome, tipo, numero_serie, status }]).select().single()
    if (error) throw error; return data
  },
  update: async (id, { nome, tipo, numero_serie, status }) => {
    const { data, error } = await supabase.from('equipamento').update({ nome, tipo, numero_serie, status }).eq('id', id).select().single()
    if (error) throw error; return data
  },
  remove: async (id) => {
    const { data, error } = await supabase.from('equipamento').delete().eq('id', id).select('id').single()
    if (error) throw error; return data
  }
}