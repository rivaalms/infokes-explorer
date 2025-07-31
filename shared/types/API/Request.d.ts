declare global {
   namespace API {
      namespace Request {
         type Context = {
            query: Record<string, string>
         }
      }
   }
}

export {}
