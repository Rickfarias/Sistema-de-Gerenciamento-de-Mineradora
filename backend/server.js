import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './src/config/env.js'
import routes from './src/routes/index.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.corsOrigin }))
app.use(express.json({ limit: '1mb' }))

app.get('/api/status', (req, res) => {
  res.json({
    status: 'Online',
    mensagem: 'Backend do Sistema de Gerenciamento da Mineradora operando com sucesso!'
  })
})

app.use('/api', routes)

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Erro interno do servidor' })
})

app.listen(env.port, () => {
  console.log(`\nServidor rodando com sucesso!`)
  console.log(`URL local: http://localhost:${env.port}`)
  console.log(`Rota de teste: http://localhost:${env.port}/api/status\n`)
})