import { folderRepo } from "../repositories/folders"

export function folderService() {
   async function get() {
      const data = await folderRepo().get()
      const result = buildTree(data, null)
      return result
   }

   function buildTree(data: Model.Folder[], parentId: number | null) {
      const nodes: Model.Folder[] = data.filter(
         (item) => item.parent_id == parentId
      )
      for (const node of nodes) {
         if (node.parent_id) {
            node.children = buildTree(data, node.id)
         }
      }
      return nodes
   }

   return {
      get,
   }
}
