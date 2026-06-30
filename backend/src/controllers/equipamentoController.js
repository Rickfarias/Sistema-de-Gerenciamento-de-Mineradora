import { supabase } from '../config/supabaseClient.js'

export const listar = async (req, res) => {
  const { data, error } = await supabase.from('equipamentos').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const buscarPorId = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('equipamentos').select('*').eq('id', id).single()
  if (error) return res.status(404).json({ error: 'Equipamento não encontrado' })
  res.json(data)
}

export const listarServicos = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('servicos').select('*').eq('equipamento_id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const criar = async (req, res) => {
  const { nome, descricao, numero_serie, status, cidade_id } = req.body
  const { data, error } = await supabase
    .from('equipamentos')
    .insert({ nome, descricao, numero_serie, status, cidade_id })
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
}

export const atualizar = async (req, res) => {
  const { id } = req.params
  const { nome, descricao, numero_serie, status, cidade_id } = req.body
  const { data, error } = await supabase
    .from('equipamentos')
    .update({ nome, descricao, numero_serie, status, cidade_id })
    .eq('id', id)
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const deletar = async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('equipamentos').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
}