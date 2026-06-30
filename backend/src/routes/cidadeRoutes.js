import { Router } from 'express'
import * as cidadeController from '../controllers/cidadeController.js'

const router = Router()

router.get('/', cidadeController.listar)
router.get('/:id', cidadeController.buscarPorId)
router.post('/', cidadeController.criar)
router.put('/:id', cidadeController.atualizar)
router.delete('/:id', cidadeController.deletar)

export default router