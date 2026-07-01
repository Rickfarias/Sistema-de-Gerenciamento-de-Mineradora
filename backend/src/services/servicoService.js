import { ServicoModel } from '../models/Servico.js'

const STATUS_VALIDOS = ['aberto', 'em_andamento', 'concluido']

const erro = (mensagem, status = 400) => {
  const e = new Error(mensagem)
  e.status = status
  return e
}

const normalizar = (dados) => ({
  ...dados,
  status: dados.status || 'aberto',
  data_abertura: dados.data_abertura || new Date().toISOString().slice(0, 10)
})

const validarStatus = (status) => {
  if (!status?.trim()) throw erro('status e obrigatorio')
  if (!STATUS_VALIDOS.includes(status)) throw erro('status invalido')
}

const validarCriacao = ({ descricao, equipamento_id, funcionario_id }) => {
  if (!descricao?.trim()) throw erro('descricao e obrigatoria')
  if (!equipamento_id) throw erro('equipamento_id e obrigatorio')
  if (!funcionario_id) throw erro('funcionario_id e obrigatorio')
}

const validarDatas = ({ data_abertura, data_conclusao }) => {
  if (data_abertura && data_conclusao && new Date(data_conclusao) < new Date(data_abertura)) {
    throw erro('data_conclusao nao pode ser anterior a data_abertura')
  }
}

export const servicoService = {
  listarTodas: (status) => ServicoModel.findAll(status),

  buscarPorId: async (id) => {
    const servico = await ServicoModel.findById(id)
    if (!servico) throw erro('Servico nao encontrado', 404)
    return servico
  },

  criar: (dados) => {
    const dadosNormalizados = normalizar(dados)
    validarCriacao(dadosNormalizados)
    validarStatus(dadosNormalizados.status)
    validarDatas(dadosNormalizados)
    return ServicoModel.create(dadosNormalizados)
  },

  atualizar: async (id, dados) => {
    const dadosNormalizados = normalizar(dados)
    validarCriacao(dadosNormalizados)
    validarStatus(dadosNormalizados.status)
    validarDatas(dadosNormalizados)
    const servico = await ServicoModel.update(id, dadosNormalizados)
    if (!servico) throw erro('Servico nao encontrado', 404)
    return servico
  },

  atualizarStatus: async (id, status) => {
    validarStatus(status)
    const servico = await ServicoModel.updateStatus(id, status)
    if (!servico) throw erro('Servico nao encontrado', 404)
    return servico
  },

  remover: async (id) => {
    const servico = await ServicoModel.remove(id)
    if (!servico) throw erro('Servico nao encontrado', 404)
  }
}
