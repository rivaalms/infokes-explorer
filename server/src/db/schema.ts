import {
   mysqlTable,
   varchar,
   int,
   mysqlEnum,
   foreignKey,
} from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"

export const folders = mysqlTable(
   "folders",
   {
      id: int("id").primaryKey().autoincrement(),
      name: varchar("name", { length: 255 }).notNull(),
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

export const foldersRelations = relations(folders, ({ many, one }) => ({
   children: many(folders, {
      relationName: "folder_children",
   }),
   parent: one(folders, {
      fields: [folders.parent_id],
      references: [folders.id],
      relationName: "folder_children",
   }),
   files: many(files, {
      relationName: "folder_files",
   }),
}))

export const files = mysqlTable(
   "files",
   {
      id: int("id").primaryKey().autoincrement(),
      name: varchar("name", { length: 255 }).notNull(),
      type: mysqlEnum("type", ["image", "audio", "document", "video"]).notNull(),
      folder_id: int("folder_id"),
   },
   (table) => [
      foreignKey({
         name: "folder_id_fk",
         columns: [table.folder_id],
         foreignColumns: [folders.id],
      })
         .onDelete("cascade")
         .onUpdate("cascade"),
   ]
)

export const filesRelations = relations(files, ({ one }) => ({
   folder: one(folders, {
      fields: [files.folder_id],
      references: [folders.id],
      relationName: "file_folder",
   }),
}))
