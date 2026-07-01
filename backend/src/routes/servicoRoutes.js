import { Router } from 'express'
import { validateId } from '../middlewares/validate.js'
import * as servicoController from '../controllers/servicoController.js'

const router = Router()

router.get('/', servicoController.listar)
router.get('/:id', validateId, servicoController.buscarPorId)
router.post('/', servicoController.criar)
router.put('/:id', validateId, servicoController.atualizar)
router.patch('/:id/status', validateId, servicoController.atualizarStatus)
router.delete('/:id', validateId, servicoController.deletar)

export default router