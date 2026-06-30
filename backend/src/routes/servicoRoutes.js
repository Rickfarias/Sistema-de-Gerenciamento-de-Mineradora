import { Router } from 'express'
import * as servicoController from '../controllers/servicoController.js'

const router = Router()

router.get('/', servicoController.listar)
router.get('/:id', servicoController.buscarPorId)
router.post('/', servicoController.criar)
router.put('/:id', servicoController.atualizar)
router.patch('/:id/status', servicoController.atualizarStatus)
router.delete('/:id', servicoController.deletar)

export default router