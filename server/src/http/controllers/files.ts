import { fileService } from "../services/files"
import { resolveResponse } from "../../utils/http"

export function fileC() {
   async function get(context?: API.Request.Context) {
      const result = await fileService().get(context)
      return resolveResponse(result)
   }

   return {
      get
   }
}
