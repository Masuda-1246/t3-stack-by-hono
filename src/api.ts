import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

// 静的ファイルを配信
app.use('/*', serveStatic({ root: './dist' }))

// SPA対応: どのパスでもindex.htmlを返す
app.get('/*', serveStatic({ path: './dist/index.html' }))

app.get('/api/hello', (c) => c.json({ message: 'Hello from Hono!' }))

export default app