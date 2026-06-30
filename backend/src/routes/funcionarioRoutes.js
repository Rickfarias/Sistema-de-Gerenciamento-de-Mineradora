import { Router } from 'express'
import * as funcionarioController from '../controllers/funcionarioController.js'

const router = Router()

router.get('/', funcionarioController.listar)
router.get('/:id', funcionarioController.buscarPorId)
router.post('/', funcionarioController.criar)
router.put('/:id', funcionarioController.atualizar)
router.delete('/:id', funcionarioController.deletar)

export default router