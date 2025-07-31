import { db } from "../../db/client"

export function fileRepo() {
   async function get() {
      const result = await db.query.files.findMany()
      return result
   }

   return {
      get,
   }
}
