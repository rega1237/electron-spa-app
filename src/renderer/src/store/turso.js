import { createClient } from '@libsql/client'

const turso = createClient({
  url: import.meta.env.VITE_URL,
  authToken: import.meta.env.VITE_API_KEY
})

export default turso
