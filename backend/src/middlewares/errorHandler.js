export const notFound = (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
}

export const errorHandler = (err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Erro interno do servidor' })
}