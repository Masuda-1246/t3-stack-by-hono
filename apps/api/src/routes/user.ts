import { Hono } from 'hono'
import type { User } from 'schema/src/user'

const userRoute = new Hono()

userRoute.get('/', (c) => {
  // サンプル: ユーザー一覧を返す
  const users: User[] = [
    { id: '1', name: 'Taro', email: 'taro@example.com' },
    { id: '2', name: 'Jiro', email: 'jiro@example.com' },
  ]
  return c.json(users)
})

export default userRoute