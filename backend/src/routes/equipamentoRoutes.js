import { Router } from 'express'
import { validateId } from '../middlewares/validate.js'
import * as equipamentoController from '../controllers/equipamentoController.js'

const router = Router()

router.get('/', equipamentoController.listar)
router.get('/:id', validateId, equipamentoController.buscarPorId)
router.get('/:id/servicos', validateId, equipamentoController.listarServicos)
router.post('/', equipamentoController.criar)
router.put('/:id', validateId, equipamentoController.atualizar)
router.delete('/:id', validateId, equipamentoController.deletar)

export default router