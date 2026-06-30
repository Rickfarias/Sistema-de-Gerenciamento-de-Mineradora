import { Router } from 'express'
import * as equipamentoController from '../controllers/equipamentoController.js'

const router = Router()

router.get('/', equipamentoController.listar)
router.get('/:id', equipamentoController.buscarPorId)
router.get('/:id/servicos', equipamentoController.listarServicos)
router.post('/', equipamentoController.criar)
router.put('/:id', equipamentoController.atualizar)
router.delete('/:id', equipamentoController.deletar)

export default router