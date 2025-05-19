import { serve } from '@hono/node-server'
import app from './index.js'

serve(app, (info) => {
  console.log(`API server running at http://localhost:${info.port}`)
}) 