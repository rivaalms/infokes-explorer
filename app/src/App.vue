<script setup lang="ts">
import FolderTree from "./components/FolderTree.vue"
import ItemGrid from "./components/ItemGrid.vue"
import { $fetch } from "@/utils/$fetch"
import { onMounted, ref } from "vue"
import { useFileStore } from "@/stores/file"

const fileStore = useFileStore()

const data = ref<Model.Folder[]>([])

onMounted(async () => {
   const response = await $fetch<API.Response<Model.Folder[]>>("/folders", {
      method: "get",
   })
   data.value = response.data.map((item) => ({ ...item, selected: false }))
})
</script>

<template>
   <div class="h-screen p-5">
      <div class="h-full rounded-xl border border-gray-200 shadow-lg">
         <div class="h-full p-4 grid grid-cols-4 gap-4">
            <div class="flex flex-col overflow-y-auto gap-1 border-e border-gray-200 pe-4">
               <FolderTree :data="data" />
            </div>
            <div class="col-span-3 p-4">
               <ItemGrid v-model:current-dir="fileStore.currentDir" />
            </div>
         </div>
      </div>
   </div>
</template>
