<script setup lang="ts">
import { $fetch } from "@/utils/$fetch"
import { computed, ref } from "vue"
import { asyncComputed } from "@vueuse/core"

const currentDir = defineModel<Model.Folder | undefined>("currentDir", {
   required: true,
   default: undefined,
})

const folders = computed(() => {
   return currentDir.value?.children ?? []
})

const cachedFiles = ref<
   {
      folderId: number
      files: Model.File[]
   }[]
>([])
async function fetchFiles(folderId: number) {
   const response = await $fetch<API.Response<Model.File[]>>(`/files`, {
      method: "get",
      query: {
         folderId,
      },
   })

   return response.data
}

function saveFilesToCache(folderId: number, files: Model.File[]) {
   cachedFiles.value.push({ folderId, files })
}

const filesInCurrentDir = asyncComputed(async () => {
   if (!currentDir.value) return []

   const cached = cachedFiles.value.find(
      (item) => item.folderId === currentDir.value?.id
   )
   if (cached) return cached.files

   const files = await fetchFiles(currentDir.value.id)
   saveFilesToCache(currentDir.value.id, files)
   return files
})

function onFolderClick(folder: Model.Folder) {
   currentDir.value = folder
}

function onFileClick(file: Model.File) {
   alert(file.name)
}
</script>

<template>
   <div class="grid grid-cols-6 gap-4">
      <div class="col-span-full mb-4">
         <span class="font-medium">
            {{ currentDir?.name }}
         </span>
      </div>
      <template v-if="folders.length > 0 || filesInCurrentDir?.length || 0 > 0">
         <template v-for="folder in folders">
            <div
               class="flex flex-col gap-2 items-center justify-center hover:bg-blue-500/5 hover:text-blue-500 rounded-lg p-4 cursor-pointer"
               @click="onFolderClick(folder)"
            >
               <span class="lucide--folder size-12" />
               <span class="text-sm">
                  {{ folder.name }}
               </span>
            </div>
         </template>
         <template v-for="file in filesInCurrentDir">
            <div
               class="flex flex-col gap-2 items-center justify-center hover:bg-blue-500/5 hover:text-blue-500 rounded-lg p-4 cursor-pointer"
               @click="onFileClick(file)"
            >
               <span class="lucide--file size-12" />
               <span class="text-sm">
                  {{ file.name }}
               </span>
            </div>
         </template>
      </template>
      <template v-else>
         <div class="col-span-full h-12 flex items-center justify-center">
            <span class="font-light">
               No items
            </span>
         </div>
      </template>
   </div>
</template>
