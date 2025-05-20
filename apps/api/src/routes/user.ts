import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import { UserEntity } from '../models/user.js'

const userRoute = new Hono()

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export const userSchema = z.object({
  id: z.string(),
  ...createUserSchema.shape,
})


const getUsers = userRoute.get('/', async (c) => {
  // サンプル: ユーザー一覧を返す
  const { data: users } = await UserEntity.query.userByCreatedAt({type: 'user'}).go()
  return c.json(users)
})

const createUser = userRoute.post('/', zValidator('json', createUserSchema), async (c) => {
  const body = await c.req.json()
  const result = createUserSchema.safeParse(body)
  if (!result.success) {
    return c.json({ error: result.error.message }, 400)
  }
  const { name, email } = result.data
  await UserEntity.put({ name, email }).go()
  return c.json({ name, email })
})

const userHndler = {
  getUsers,
  createUser,
}

export type GetUsers = typeof getUsers
export type CreateUser = typeof createUser

export type UserHandler = typeof userHndler

export default userRoute