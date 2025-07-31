import { db } from "../db/client"

export const fileC = {
   async get() {
      const data = await db.query.files.findMany()

      function buildTree(parentId: number | null) {
         const nodes: Model.File[] = data.filter(
            (item) => item.parent_id == parentId
         )
         for (const node of nodes) {
            if (node.type == "dir") {
               node.children = buildTree(node.id)
            }
         }
         return nodes
      }

      const result = buildTree(null)
      return result
   },
}
