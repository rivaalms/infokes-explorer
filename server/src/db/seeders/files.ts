import data from "./data/dummy.json"
import { db } from "../client"
import { files as filesTable, folders as foldersTable } from "../schema"

export async function execute() {
   await seedItems(data as unknown as Data[])
}

type Data = {
   name: string
   children?: Data[]
   files: {
      name: string
      type: string
      [key: string]: string | number
   }[]
}

async function seedItems(items: Data[], parentId?: number) {
   for (const item of items) {
      const result = await db.insert(foldersTable).values({
         name: item.name,
         parent_id: parentId ?? null,
      })

      if (item.files && item.files.length > 0) {
         for (const file of item.files) {
            await db.insert(filesTable).values({
               name: file.name,
               type: file.type as (typeof filesTable.$inferInsert)["type"],
               folderId: result[0].insertId,
            })
         }
      }

      if (item.children && item.children.length > 0) {
         await seedItems(item.children as Data[], result[0].insertId)
      }
   }
}
