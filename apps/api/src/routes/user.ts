import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const userRoute = new Hono()

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUsers = userRoute.get('/', (c) => {
  // サンプル: ユーザー一覧を返す
  const users: z.infer<typeof userSchema>[] = [
    { id: '1', name: 'Taro', email: 'taro@example.com' },
    { id: '2', name: 'Jiro', email: 'jiro@example.com' },
  ]
  return c.json(users)
})

userRoute.post('/', zValidator('json', userSchema), (c) => {
  const { id, name, email } = c.req.valid('json')
  return c.json({ id, name, email })
})

export type GetUsers = typeof getUsers

export default userRoute