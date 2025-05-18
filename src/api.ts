import { Hono } from 'hono'

const app = new Hono()

app.get('/api/hello', (c) => c.json({ message: 'Hello from Hono!' }))

export default app 