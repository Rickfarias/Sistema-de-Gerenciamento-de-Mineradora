import pool from '../config/database.js'

export const EquipamentoModel = {
  findAll: async () => {
    const result = await pool.query('SELECT * FROM equipamentos ORDER BY nome ASC')
    return result.rows
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM equipamentos WHERE id = $1', [id])
    return result.rows[0]
  },

  findServicosByEquipamentoId: async (id) => {
    const result = await pool.query('SELECT * FROM servicos WHERE equipamento_id = $1', [id])
    return result.rows
  },

  create: async ({ nome, descricao, numero_serie, status, cidade_id }) => {
    const result = await pool.query(
      `INSERT INTO equipamentos (nome, descricao, numero_serie, status, cidade_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nome, descricao, numero_serie, status, cidade_id]
    )
    return result.rows[0]
  },

  update: async (id, { nome, descricao, numero_serie, status, cidade_id }) => {
    const result = await pool.query(
      `UPDATE equipamentos SET nome = $1, descricao = $2, numero_serie = $3, status = $4, cidade_id = $5
       WHERE id = $6 RETURNING *`,
      [nome, descricao, numero_serie, status, cidade_id, id]
    )
    return result.rows[0]
  },

  remove: async (id) => {
    const result = await pool.query('DELETE FROM equipamentos WHERE id = $1 RETURNING id', [id])
    return result.rows[0]
  }
}