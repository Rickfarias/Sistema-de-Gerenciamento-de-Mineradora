import { Router } from 'express'
import cidadeRoutes from './cidadeRoutes.js'
import equipamentoRoutes from './equipamentoRoutes.js'
import funcionarioRoutes from './funcionarioRoutes.js'
import servicoRoutes from './servicoRoutes.js'

const router = Router()

router.use('/cidades', cidadeRoutes)
router.use('/equipamentos', equipamentoRoutes)
router.use('/funcionarios', funcionarioRoutes)
router.use('/servicos', servicoRoutes)

export default router