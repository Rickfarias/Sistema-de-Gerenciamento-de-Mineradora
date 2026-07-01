import { EquipamentoModel } from '../models/Equipamento.js'

const erro = (mensagem, status = 400) => {
  const e = new Error(mensagem)
  e.status = status
  return e
}

const validar = ({ nome, numero_serie, cidade_id }) => {
  if (!nome?.trim()) throw erro('nome é obrigatório')
  if (!numero_serie?.trim()) throw erro('numero_serie é obrigatório')
  if (!cidade_id) throw erro('cidade_id é obrigatório')
}

export const equipamentoService = {
  listarTodas: () => EquipamentoModel.findAll(),

  buscarPorId: async (id) => {
    const equipamento = await EquipamentoModel.findById(id)
    if (!equipamento) throw erro('Equipamento não encontrado', 404)
    return equipamento
  },

  listarServicosPorEquipamento: (id) => EquipamentoModel.findServicosByEquipamentoId(id),

  criar: (dados) => {
    validar(dados)
    return EquipamentoModel.create(dados)
  },

  atualizar: async (id, dados) => {
    validar(dados)
    const equipamento = await EquipamentoModel.update(id, dados)
    if (!equipamento) throw erro('Equipamento não encontrado', 404)
    return equipamento
  },

  remover: async (id) => {
    const equipamento = await EquipamentoModel.remove(id)
    if (!equipamento) throw erro('Equipamento não encontrado', 404)
  }
}