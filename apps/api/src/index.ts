import { Hono } from 'hono'
import userRoute from './routes/user.js'

const app = new Hono()

app.route('/api/users', userRoute)

export default app