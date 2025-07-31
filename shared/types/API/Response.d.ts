declare global {
   namespace API {
      type Response<T> = {
         meta: {
            success: boolean
            message: string
            error: string
         }
         data: T
      }
   }
}

export {}
