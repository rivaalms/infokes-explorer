import { db } from "../../db/client"
import { eq, like, and } from "drizzle-orm"

export function fileRepo() {
   async function get(filters?: { folderId?: string, search?: string }) {
      const where = []
      if (filters?.folderId) {
         where.push(eq(db._.schema!.files.columns.folder_id, Number(filters.folderId)))
      }

      if (filters?.search) {
         where.push(like(db._.schema!.files.columns.name, `%${filters.search}%`))
      }
      
      const result = await db.query.files.findMany({
         where: where.length ? and(...where) : undefined,
      })
      return result
   }

   return {
      get,
   }
}
