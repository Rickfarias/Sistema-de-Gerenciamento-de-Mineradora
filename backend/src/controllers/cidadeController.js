import { supabase } from '../config/supabaseClient.js'

export const listar = async (req, res) => {
  const { data, error } = await supabase.from('cidades').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const buscarPorId = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('cidades').select('*').eq('id', id).single()
  if (error) return res.status(404).json({ error: 'Cidade não encontrada' })
  res.json(data)
}

export const criar = async (req, res) => {
  const { nome, estado } = req.body
  const { data, error } = await supabase.from('cidades').insert({ nome, estado }).select().single()
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
}

export const atualizar = async (req, res) => {
  const { id } = req.params
  const { nome, estado } = req.body
  const { data, error } = await supabase.from('cidades').update({ nome, estado }).eq('id', id).select().single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const deletar = async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('cidades').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
}