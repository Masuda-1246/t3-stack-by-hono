import { hc } from 'hono/client'
import type { GetUsers } from 'api/src/routes/user'
import { useQuery } from '@tanstack/react-query'

export default function User() {

  const client = hc<GetUsers>('/api/users')

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await client.index.$get()
      return res.json()
    },
  })

  return (
    <div style={{ padding: 32 }}>
      <h1>ユーザー一覧</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users?.map((u) => (
            <li key={u.id}>{u.name} ({u.email})</li>
          ))}
        </ul>
      )}
    </div>
  )
}