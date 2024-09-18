import { drizzle } from 'drizzle-orm/neon-serverless'
import { config } from 'dotenv'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

config({ path: '.env.local' })
neonConfig.webSocketConstructor = ws

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

pool.on('error', (err) => console.error(err))

export const db = drizzle(pool)
