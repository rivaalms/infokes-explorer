import { drizzle } from "drizzle-orm/bun-sql"
import { SQL } from "bun"

const client = new SQL(process.env.DB_HOST!)
export const db = drizzle({ client })
