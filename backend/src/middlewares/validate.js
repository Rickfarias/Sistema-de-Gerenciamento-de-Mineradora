export const validateId = (req, res, next) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).json({ error: 'id inválido' })
  }
  next()
}