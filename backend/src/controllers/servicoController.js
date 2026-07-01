import { servicoService } from '../services/servicoService.js'

export const listar = async (req, res, next) => {
  try {
    res.json(await servicoService.listarTodas(req.query.status))
  } catch (err) {
    next(err)
  }
}

export const buscarPorId = async (req, res, next) => {
  try {
    res.json(await servicoService.buscarPorId(req.params.id))
  } catch (err) {
    next(err)
  }
}

export const criar = async (req, res, next) => {
  try {
    res.status(201).json(await servicoService.criar(req.body))
  } catch (err) {
    next(err)
  }
}

export const atualizar = async (req, res, next) => {
  try {
    res.json(await servicoService.atualizar(req.params.id, req.body))
  } catch (err) {
    next(err)
  }
}

export const atualizarStatus = async (req, res, next) => {
  try {
    res.json(await servicoService.atualizarStatus(req.params.id, req.body.status))
  } catch (err) {
    next(err)
  }
}

export const deletar = async (req, res, next) => {
  try {
    await servicoService.remover(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}