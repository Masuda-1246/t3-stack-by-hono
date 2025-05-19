import { useQuery } from '@tanstack/react-query'
import { User } from 'schema/src/user'

export default function App() {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users')
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