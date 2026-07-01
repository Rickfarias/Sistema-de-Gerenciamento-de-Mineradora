import { equipamentoService } from '../services/equipamentoService.js'

export const listar = async (req, res, next) => {
  try {
    res.json(await equipamentoService.listarTodas())
  } catch (err) {
    next(err)
  }
}

export const buscarPorId = async (req, res, next) => {
  try {
    res.json(await equipamentoService.buscarPorId(req.params.id))
  } catch (err) {
    next(err)
  }
}

export const listarServicos = async (req, res, next) => {
  try {
    res.json(await equipamentoService.listarServicosPorEquipamento(req.params.id))
  } catch (err) {
    next(err)
  }
}

export const criar = async (req, res, next) => {
  try {
    res.status(201).json(await equipamentoService.criar(req.body))
  } catch (err) {
    next(err)
  }
}

export const atualizar = async (req, res, next) => {
  try {
    res.json(await equipamentoService.atualizar(req.params.id, req.body))
  } catch (err) {
    next(err)
  }
}

export const deletar = async (req, res, next) => {
  try {
    await equipamentoService.remover(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}