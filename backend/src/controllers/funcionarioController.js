import { supabase } from '../config/supabaseClient.js'

export const listar = async (req, res) => {
  const { data, error } = await supabase.from('funcionarios').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const buscarPorId = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('funcionarios').select('*').eq('id', id).single()
  if (error) return res.status(404).json({ error: 'Funcionário não encontrado' })
  res.json(data)
}

export const criar = async (req, res) => {
  const { nome, cpf, telefone, email, cargo, cidade_id } = req.body
  const { data, error } = await supabase
    .from('funcionarios')
    .insert({ nome, cpf, telefone, email, cargo, cidade_id })
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
}

export const atualizar = async (req, res) => {
  const { id } = req.params
  const { nome, cpf, telefone, email, cargo, cidade_id } = req.body
  const { data, error } = await supabase
    .from('funcionarios')
    .update({ nome, cpf, telefone, email, cargo, cidade_id })
    .eq('id', id)
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const deletar = async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('funcionarios').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
}