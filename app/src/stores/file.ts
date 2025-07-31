import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useFileStore = defineStore("file", () => {
   const selected = ref<Model.File>()

   function select(item: Model.File) {
      selected.value = item
   }

   return {
      selected,
      select
   }
})
