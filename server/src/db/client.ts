import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"

const client = mysql.createPool({
   host: process.env.DB_HOST as string,
   port: Number(process.env.DB_PORT ?? 3306),
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD || undefined,
   database: process.env.DB_NAME as string,
})
export const db = drizzle({ client })
