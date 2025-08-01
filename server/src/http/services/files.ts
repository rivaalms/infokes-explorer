import { fileRepo } from "../repositories/files"

export function fileService() {
   async function get(context?: API.Request.Context) {
      const folderId = context?.query.folderId
      const search = context?.query.search
      const result = await fileRepo().get({ folderId, search })
      return result
   }

   return {
      get,
   }
}
