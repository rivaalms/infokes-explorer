import { fileService } from "../services/files"
import { resolveResponse } from "../../utils/http"

export const fileC = {
   async get() {
      const result = await fileService().get()
      return resolveResponse(result)
   },
}
