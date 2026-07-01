import { FuncionarioModel } from '../models/Funcionario.js'

const erro = (mensagem, status = 400) => {
  const e = new Error(mensagem)
  e.status = status
  return e
}

const validar = ({ nome, cpf, email, cargo, cidade_id }) => {
  if (!nome?.trim()) throw erro('nome é obrigatório')
  if (!cargo?.trim()) throw erro('cargo é obrigatório')
  if (!cidade_id) throw erro('cidade_id é obrigatório')
  if (!cpf || cpf.replace(/\D/g, '').length !== 11) throw erro('cpf inválido')
  if (email && !/^\S+@\S+\.\S+$/.test(email)) throw erro('email inválido')
}

export const funcionarioService = {
  listarTodas: () => FuncionarioModel.findAll(),

  buscarPorId: async (id) => {
    const funcionario = await FuncionarioModel.findById(id)
    if (!funcionario) throw erro('Funcionário não encontrado', 404)
    return funcionario
  },

  criar: (dados) => {
    validar(dados)
    return FuncionarioModel.create(dados)
  },

  atualizar: async (id, dados) => {
    validar(dados)
    const funcionario = await FuncionarioModel.update(id, dados)
    if (!funcionario) throw erro('Funcionário não encontrado', 404)
    return funcionario
  },

  remover: async (id) => {
    const funcionario = await FuncionarioModel.remove(id)
    if (!funcionario) throw erro('Funcionário não encontrado', 404)
  }
}