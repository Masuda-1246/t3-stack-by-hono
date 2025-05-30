import { serve } from '@hono/node-server'
import app from './index.js'

serve({
  fetch: app.fetch,
  port: 8080,
}, (info) => {
  console.log(`API server running at http://localhost:${info.port}`)
})