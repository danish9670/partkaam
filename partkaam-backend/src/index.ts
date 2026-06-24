import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

type Bindings = {
  partkaam_db: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://partkaam.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Health check
app.get('/', (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'PartKaam API is running 🚀',
    version: '1.0.0'
  })
})

// Jobs routes
app.get('/api/jobs', async (c) => {
  const { keyword, city, category, job_type } = c.req.query()
  
  let query = 'SELECT * FROM jobs WHERE status = ?'
  const params: string[] = ['active']

  if (city && city !== 'All of India') {
    query += ' AND city = ?'
    params.push(city)
  }

  if (category) {
    query += ' AND category = ?'
    params.push(category)
  }

  if (job_type) {
    query += ' AND job_type = ?'
    params.push(job_type)
  }

  if (keyword) {
    query += ' AND (title LIKE ? OR description LIKE ?)'
    params.push(`%${keyword}%`, `%${keyword}%`)
  }

  query += ' ORDER BY created_at DESC LIMIT 50'

  try {
    const result = await c.env.partkaam_db
      .prepare(query)
      .bind(...params)
      .all()
    
    return c.json({ success: true, jobs: result.results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch jobs' }, 500)
  }
})

// Get single job
app.get('/api/jobs/:id', async (c) => {
  const id = c.req.param('id')
  
  try {
    const job = await c.env.partkaam_db
      .prepare('SELECT * FROM jobs WHERE id = ?')
      .bind(id)
      .first()
    
    if (!job) return c.json({ success: false, error: 'Job not found' }, 404)
    
    return c.json({ success: true, job })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch job' }, 500)
  }
})

export default app