import { ref } from "vue"
import { defineStore } from "pinia"

export const useFileStore = defineStore("file", () => {
   const currentDir = ref<Model.Folder>()

   return {
      currentDir,
   }
})
