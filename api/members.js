import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const r = await pool.query('SELECT * FROM members')
    res.status(200).json(r.rows)
  }
}
