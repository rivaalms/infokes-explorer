import { db } from "../../db/client"

export function fileRepo() {
   async function get(filters?: { folderId?: string }) {
      const result = await db.query.files.findMany({
         where: (table, { eq }) => {
            if (!filters) return undefined
            return filters.folderId
               ? eq(table.folder_id, Number(filters.folderId))
               : undefined
         },
      })
      return result
   }

   return {
      get,
   }
}
