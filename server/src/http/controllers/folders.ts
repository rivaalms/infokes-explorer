import { folderService } from "../services/folders"
import { resolveResponse } from "../../utils/http"

export function folderC() {
   async function get() {
      const result = await folderService().get()
      return resolveResponse(result)
   }

   return {
      get,
   }
}
