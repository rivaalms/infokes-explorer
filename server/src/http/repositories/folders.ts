import { db } from "../../db/client"

export function folderRepo() {
   async function get() {
      const result = await db.query.folders.findMany()
      return result
   }

   return {
      get,
   }
}
