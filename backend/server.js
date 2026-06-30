import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './src/config/env.js'
import * as cidadeController from './src/controllers/cidadeController.js'
import * as equipamentoController from './src/controllers/equipamentoController.js'
import * as funcionarioController from './src/controllers/funcionarioController.js'
import * as servicoController from './src/controllers/servicoController.js'

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

app.get('/api/cidades', cidadeController.listar)
app.get('/api/cidades/:id', cidadeController.buscarPorId)
app.post('/api/cidades', cidadeController.criar)
app.put('/api/cidades/:id', cidadeController.atualizar)
app.delete('/api/cidades/:id', cidadeController.deletar)

app.get('/api/funcionarios', funcionarioController.listar)
app.get('/api/funcionarios/:id', funcionarioController.buscarPorId)
app.post('/api/funcionarios', funcionarioController.criar)
app.put('/api/funcionarios/:id', funcionarioController.atualizar)
app.delete('/api/funcionarios/:id', funcionarioController.deletar)

app.get('/api/equipamentos', equipamentoController.listar)
app.get('/api/equipamentos/:id', equipamentoController.buscarPorId)
app.get('/api/equipamentos/:id/servicos', equipamentoController.listarServicos)
app.post('/api/equipamentos', equipamentoController.criar)
app.put('/api/equipamentos/:id', equipamentoController.atualizar)
app.delete('/api/equipamentos/:id', equipamentoController.deletar)

app.get('/api/servicos', servicoController.listar)
app.get('/api/servicos/:id', servicoController.buscarPorId)
app.post('/api/servicos', servicoController.criar)
app.put('/api/servicos/:id', servicoController.atualizar)
app.patch('/api/servicos/:id/status', servicoController.atualizarStatus)
app.delete('/api/servicos/:id', servicoController.deletar)

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