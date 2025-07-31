import {
   mysqlTable,
   varchar,
   int,
   mysqlEnum,
   foreignKey,
} from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"

export const files = mysqlTable(
   "files",
   {
      id: int("id").primaryKey().autoincrement(),
      name: varchar("name", { length: 255 }).notNull(),
      type: mysqlEnum("type", ["dir", "file"]).notNull().default("dir"),
      parent_id: int("parent_id"),
   },
   (table) => [
      foreignKey({
         name: "parent_id_fk",
         columns: [table.parent_id],
         foreignColumns: [table.id],
      })
         .onDelete("cascade")
         .onUpdate("cascade"),
   ]
)

export const filesRelations = relations(files, ({ many, one }) => ({
   children: many(files, {
      relationName: "file_children"
   }),
   parent: one(files, {
      fields: [files.parent_id],
      references: [files.id],
      relationName: "file_children"
   }),
}))
