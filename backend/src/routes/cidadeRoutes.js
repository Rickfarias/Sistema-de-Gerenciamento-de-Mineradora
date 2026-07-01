import { Router } from 'express'
import { validateId } from '../middlewares/validate.js'
import * as cidadeController from '../controllers/cidadeController.js'

const router = Router()

router.get('/', cidadeController.listar)
router.get('/:id', validateId, cidadeController.buscarPorId)
router.post('/', cidadeController.criar)
router.put('/:id', validateId, cidadeController.atualizar)
router.delete('/:id', validateId, cidadeController.deletar)

export default router