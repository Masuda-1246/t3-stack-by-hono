import type { FormEventHandler } from "react";
import { hc } from 'hono/client'
import { z } from 'zod'
import { type UserHandler, createUserSchema } from 'api/src/routes/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function User() {
  const getUsersClient = hc<UserHandler['getUsers']>('/api/users')
  const createUserClient = hc<UserHandler['createUser']>('/api/users')

  const { data: userList, isLoading: isUserListLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await getUsersClient.index.$get()
      return res.json()
    },
  })

  const queryClient = useQueryClient()

  const { mutate: mutateCreateUser } = useMutation({
    mutationFn: async (user: z.infer<typeof createUserSchema>) => {
      const res = await createUserClient.index.$post({ json: user })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleCreateUserSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    // バリデーション処理
    if (!formData.get('name') || !formData.get('email')) {
      alert('名前とメールアドレスを入力してください')
      return
    }
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const user = createUserSchema.parse({
      name,
      email,
    })
    mutateCreateUser(user)
    const form = event.currentTarget as HTMLFormElement
    form.reset()
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>ユーザー一覧</h1>
      {isUserListLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {userList?.map((user) => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleCreateUserSubmit}>
        <input type="text" name="name" placeholder="名前" />
        <input type="email" name="email" placeholder="メールアドレス" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}