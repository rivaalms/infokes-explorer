import { fileRepo } from "../repositories/files"

export function fileService() {
   async function get(context?: API.Request.Context) {
      const folderId = context?.query.folderId
      const result = await fileRepo().get({ folderId })
      return result
   }

   return {
      get,
   }
}
