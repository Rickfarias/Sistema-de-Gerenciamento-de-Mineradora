import { Router } from 'express'
import cidadeRoutes from './cidadeRoutes.js'
import equipamentoRoutes from './equipamentoRoutes.js'
import funcionarioRoutes from './funcionarioRoutes.js'
import servicoRoutes from './servicoRoutes.js'
import usuarioRoutes from './usuarioRoutes.js' // 1. Importe a rota de usuários aqui

const router = Router()

router.use('/cidades', cidadeRoutes)
router.use('/equipamentos', equipamentoRoutes)
router.use('/funcionarios', funcionarioRoutes)
router.use('/servicos', servicoRoutes)
router.use('/usuarios', usuarioRoutes) // 2. Registre o caminho /usuarios aqui

export default router