import { Hono } from 'hono'
import userRoute from './routes/user.js'
import frontendRoute from './routes/frontend.js'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.use('/*', basicAuth({
  username: 'admin1',
  password: 'password',
}))

app.route('/api/users', userRoute)
app.route('/', frontendRoute)


export default app