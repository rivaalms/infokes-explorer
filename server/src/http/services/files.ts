import { fileRepo } from "../repositories/files"

export function fileService() {
   async function get() {
      const data = await fileRepo().get()
      const result = buildTree(data, null)
      return result
   }

   function buildTree(data: Model.File[], parentId: number | null) {
      const nodes: Model.File[] = data.filter(
         (item) => item.parent_id == parentId
      )
      for (const node of nodes) {
         if (node.type == "dir") {
            node.children = buildTree(data, node.id)
         }
      }
      return nodes
   }

   return {
      get,
   }
}
