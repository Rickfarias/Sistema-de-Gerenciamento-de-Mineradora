import { funcionarioService } from '../services/funcionarioService.js'

export const listar = async (req, res, next) => {
  try {
    res.json(await funcionarioService.listarTodas())
  } catch (err) {
    next(err)
  }
}

export const buscarPorId = async (req, res, next) => {
  try {
    res.json(await funcionarioService.buscarPorId(req.params.id))
  } catch (err) {
    next(err)
  }
}

export const criar = async (req, res, next) => {
  try {
    res.status(201).json(await funcionarioService.criar(req.body))
  } catch (err) {
    next(err)
  }
}

export const atualizar = async (req, res, next) => {
  try {
    res.json(await funcionarioService.atualizar(req.params.id, req.body))
  } catch (err) {
    next(err)
  }
}

export const deletar = async (req, res, next) => {
  try {
    await funcionarioService.remover(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}