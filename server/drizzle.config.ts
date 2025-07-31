import { defineConfig } from "drizzle-kit"

export default defineConfig({
   out: "./drizzle",
   schema: "./src/db/schema.ts",
   dialect: "mysql",
   dbCredentials: {
      database: process.env.DB_NAME as string,
      host: process.env.DB_HOST as string,
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || undefined,
   },
})
