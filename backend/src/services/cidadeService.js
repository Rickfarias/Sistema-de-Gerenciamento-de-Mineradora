import { CidadeModel } from '../models/Cidade.js'

const erro = (mensagem, status = 400) => {
  const e = new Error(mensagem)
  e.status = status
  return e
}

const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

const validar = ({ nome, estado }) => {
  if (!nome?.trim()) throw erro('nome é obrigatório')
  if (!estado || !UFS.includes(estado.toUpperCase())) throw erro('estado deve ser uma UF válida')
}

export const cidadeService = {
  listarTodas: () => CidadeModel.findAll(),

  buscarPorId: async (id) => {
    const cidade = await CidadeModel.findById(id)
    if (!cidade) throw erro('Cidade não encontrada', 404)
    return cidade
  },

  criar: (dados) => {
    validar(dados)
    return CidadeModel.create(dados)
  },

  atualizar: async (id, dados) => {
    validar(dados)
    const cidade = await CidadeModel.update(id, dados)
    if (!cidade) throw erro('Cidade não encontrada', 404)
    return cidade
  },

  remover: async (id) => {
    const cidade = await CidadeModel.remove(id)
    if (!cidade) throw erro('Cidade não encontrada', 404)
  }
}