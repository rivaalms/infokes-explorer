declare global {
   namespace Model {
      type Folder = {
         id: number
         name: string
         parent_id: number | null
         children?: Folder[]
      }

      type File = {
         id: number
         name: string
         type: "image" | "audio" | "video" | "document"
         folderId: number
      }
   }
}

export {}