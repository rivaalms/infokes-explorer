import { mysqlTable, varchar, int, mysqlEnum } from 'drizzle-orm/mysql-core'

export const files = mysqlTable('files', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  type: mysqlEnum("type", ["dir", "file"]).notNull().default("dir"),
  parent_id: int("parent_id").notNull(),
})