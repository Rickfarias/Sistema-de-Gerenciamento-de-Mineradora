import { supabase } from '../config/supabaseClient.js'

export const listar = async (req, res) => {
  const { status } = req.query
  let query = supabase.from('servicos').select('*')
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const buscarPorId = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('servicos').select('*').eq('id', id).single()
  if (error) return res.status(404).json({ error: 'Serviço não encontrado' })
  res.json(data)
}

export const criar = async (req, res) => {
  const { descricao, status, data_abertura, equipamento_id, funcionario_id } = req.body
  const { data, error } = await supabase
    .from('servicos')
    .insert({ descricao, status, data_abertura, equipamento_id, funcionario_id })
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
}

export const atualizar = async (req, res) => {
  const { id } = req.params
  const { descricao, status, data_abertura, data_conclusao, equipamento_id, funcionario_id } = req.body
  const { data, error } = await supabase
    .from('servicos')
    .update({ descricao, status, data_abertura, data_conclusao, equipamento_id, funcionario_id })
    .eq('id', id)
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const atualizarStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const { data, error } = await supabase.from('servicos').update({ status }).eq('id', id).select().single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const deletar = async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('servicos').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
}