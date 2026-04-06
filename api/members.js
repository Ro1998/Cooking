import pkg from 'pg'
const { Pool } = pkg

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : null

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!pool) {
    return res.status(500).json({ error: 'DATABASE_URL is not configured' })
  }

  try {
    const result = await pool.query('SELECT * FROM members ORDER BY id ASC')
    return res.status(200).json(result.rows)
  } catch (error) {
    console.error('Failed to load members', error)
    return res.status(500).json({ error: 'Failed to load members' })
  }
}
