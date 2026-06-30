import pool from '../config/database.js'

export const FuncionarioModel = {
  findAll: async () => {
    const result = await pool.query('SELECT * FROM funcionarios ORDER BY nome ASC')
    return result.rows
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM funcionarios WHERE id = $1', [id])
    return result.rows[0]
  },

  create: async ({ nome, cpf, telefone, email, cargo, cidade_id }) => {
    const result = await pool.query(
      `INSERT INTO funcionarios (nome, cpf, telefone, email, cargo, cidade_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nome, cpf, telefone, email, cargo, cidade_id]
    )
    return result.rows[0]
  },

  update: async (id, { nome, cpf, telefone, email, cargo, cidade_id }) => {
    const result = await pool.query(
      `UPDATE funcionarios SET nome = $1, cpf = $2, telefone = $3, email = $4, cargo = $5, cidade_id = $6
       WHERE id = $7 RETURNING *`,
      [nome, cpf, telefone, email, cargo, cidade_id, id]
    )
    return result.rows[0]
  },

  remove: async (id) => {
    const result = await pool.query('DELETE FROM funcionarios WHERE id = $1 RETURNING id', [id])
    return result.rows[0]
  }
}