import * as usuarioService from '../services/usuarioService.js'

export const criar = async (req, res, next) => {
  try {
    const { nome, email, senha, role } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' })
    }

    const usuario = await usuarioService.cadastrar({ nome, email, senha, role })
    
    res.status(201).json(usuario)
  } catch (error) {
    next(error)
  }
}