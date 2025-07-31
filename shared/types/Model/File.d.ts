declare global {
   namespace Model {
      type File = {
         id: number
         name: string
         type: "dir" | "file"
         parent_id: number | null
         children?: File[]
      }
   }
}

export {}