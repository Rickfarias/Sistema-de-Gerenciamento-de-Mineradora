import pg from 'pg'
import { env } from './env.js'

const { Pool } = pg

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: { rejectUnauthorized: false }
})

pool.on('error', (err) => {
  console.error('Erro inesperado no pool do Postgres:', err)
})

export default pool