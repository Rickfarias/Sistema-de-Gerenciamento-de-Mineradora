import { supabase } from '../supabaseClient.js'

export const ServicoModel = {
  findAll: async (status) => {
    let query = supabase.from('servico').select('*').order('data_servico', { ascending: false })
    if (status) query = query.eq('status', status)
    const { data, error } = await query
    if (error) throw error; return data
  },
  findById: async (id) => {
    const { data, error } = await supabase.from('servico').select('*').eq('id', id).single()
    if (error) throw error; return data
  },
  create: async ({ descricao, status, data_servico, equipamento_id, funcionario_id, cidade_id }) => {
    const { data, error } = await supabase.from('servico').insert([{ descricao, status, data_servico, equipamento_id, funcionario_id, cidade_id }]).select().single()
    if (error) throw error; return data
  },
  update: async (id, { descricao, status, data_servico, equipamento_id, funcionario_id, cidade_id }) => {
    const { data, error } = await supabase.from('servico').update({ descricao, status, data_servico, equipamento_id, funcionario_id, cidade_id }).eq('id', id).select().single()
    if (error) throw error; return data
  },
  remove: async (id) => {
    const { data, error } = await supabase.from('servico').delete().eq('id', id).select('id').single()
    if (error) throw error; return data
  }
}