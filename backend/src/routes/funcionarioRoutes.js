import { Router } from 'express'
import { validateId } from '../middlewares/validate.js'
import * as funcionarioController from '../controllers/funcionarioController.js'

const router = Router()

router.get('/', funcionarioController.listar)
router.get('/:id', validateId, funcionarioController.buscarPorId)
router.post('/', funcionarioController.criar)
router.put('/:id', validateId, funcionarioController.atualizar)
router.delete('/:id', validateId, funcionarioController.deletar)

export default router