import pool from '../config/database.js'

export const CidadeModel = {
  findAll: async () => {
    const result = await pool.query('SELECT * FROM cidades ORDER BY nome ASC')
    return result.rows
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM cidades WHERE id = $1', [id])
    return result.rows[0]
  },

  create: async ({ nome, estado }) => {
    const result = await pool.query(
      'INSERT INTO cidades (nome, estado) VALUES ($1, $2) RETURNING *',
      [nome, estado]
    )
    return result.rows[0]
  },

  update: async (id, { nome, estado }) => {
    const result = await pool.query(
      'UPDATE cidades SET nome = $1, estado = $2 WHERE id = $3 RETURNING *',
      [nome, estado, id]
    )
    return result.rows[0]
  },

  remove: async (id) => {
    const result = await pool.query('DELETE FROM cidades WHERE id = $1 RETURNING id', [id])
    return result.rows[0]
  }
}