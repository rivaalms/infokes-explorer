import data from "./data/files.json"
import { db } from "../client"
import { files as filesTable } from "../schema"

export async function execute() {
   await seedItems(data)
}

async function seedItems(items: typeof data, parentId?: number) {
   for (const item of items) {
      const result = await db.insert(filesTable).values({
         name: item.name,
         parent_id: parentId ?? null,
         type: item.type as "dir" | "file",
      })

      if (item.children && item.children.length > 0) {
         await seedItems(item.children as typeof data, result[0].insertId)
      }
   }
}
