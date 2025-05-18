import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import type { HealthCheckResponse } from '../shared/healthcheck.js'

const app = new Hono()

// 静的ファイルを配信
app.use('/*', serveStatic({ root: './dist' }))

app.get('/api/hello', (c) => c.json({ message: 'Hello from Hono!' }))

app.get('/api/health', (c) => {
  const res: HealthCheckResponse = { status: 'ok' }
  return c.json(res)
})

// SPA対応: どのパスでもindex.htmlを返す
app.get('/*', serveStatic({ path: './dist/index.html' }))

export default app