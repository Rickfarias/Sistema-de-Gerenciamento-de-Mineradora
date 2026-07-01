import { Router } from 'express'
import { criar } from '../controllers/usuarioController.js'

const router = Router()

router.post('/', criar)

export default router