import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const userRoute = new Hono()

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export const userSchema = z.object({
  id: z.string(),
  ...createUserSchema.shape,
})

const userList = [
  { id: '1', name: 'Taro', email: 'taro@example.com' },
  { id: '2', name: 'Jiro', email: 'jiro@example.com' },
]

const getUsers = userRoute.get('/all/users', (c) => {
  // サンプル: ユーザー一覧を返す
  const users: z.infer<typeof userSchema>[] = userList
  return c.json(users)
})

const createUser = userRoute.post('/', zValidator('json', createUserSchema), (c) => {
  const { name, email } = c.req.valid('json')
  const id = crypto.randomUUID()
  userList.push({ id, name, email })
  return c.json({ id, name, email })
})

const userHndler = {
  getUsers,
  createUser,
}

export type GetUsers = typeof getUsers
export type CreateUser = typeof createUser

export type UserHandler = typeof userHndler

export default userRoute