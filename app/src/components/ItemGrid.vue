<script setup lang="ts">
import { $fetch } from "@/utils/$fetch"
import { computed, ref, shallowRef } from "vue"
import { asyncComputed, watchDebounced } from "@vueuse/core"

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

const loading = shallowRef(false)
async function fetchFiles(folderId?: number, search?: string) {
   loading.value = true
   try {
      const response = await $fetch<API.Response<Model.File[]>>(`/files`, {
         method: "get",
         query: {
            folderId,
            search,
         },
      })
      return response.data
   } catch (e) {
      return []
   } finally {
      loading.value = false
   }
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

const searchModel = shallowRef<string>()
const searchResult = ref<Model.File[]>([])
watchDebounced(
   searchModel,
   async (value) => {
      if (!value) {
         searchResult.value = []
         return
      }
      await fetchFiles(undefined, value).then((res) => {
         searchResult.value = res
      })
   },
   { debounce: 1000, maxWait: 1000 }
)
</script>

<template>
   <div class="grid grid-cols-6 gap-4">
      <div class="col-span-full mb-4 flex items-center justify-between gap-4">
         <span class="font-medium">
            {{
               searchModel
                  ? `Search Results for "${searchModel}"`
                  : currentDir?.name
            }}
         </span>
         <slot name="actions">
            <div class="relative">
               <input
                  v-model="searchModel"
                  class="border border-gray-300 px-3 py-1.5 ps-8 outline-none focus:border-blue-500 rounded text-sm"
                  placeholder="Search..."
               />
               <span
                  class="absolute left-0 top-1/2 -translate-y-1/2 ms-2.5 lucide--search size-4 text-gray-400"
               />
            </div>
         </slot>
      </div>
      <template v-if="!loading">
         <template v-if="!searchModel">
            <template
               v-if="folders.length > 0 || filesInCurrentDir?.length || 0 > 0"
            >
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
         </template>
         <template v-else>
            <template v-for="file in searchResult">
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
         <template
            v-if="
               (currentDir && !folders.length && !filesInCurrentDir?.length) ||
               (searchModel && !searchResult.length)
            "
         >
            <div class="col-span-full h-12 flex items-center justify-center">
               <span class="font-light"> No items </span>
            </div>
         </template>
      </template>
      <template v-else>
         <div class="col-span-full h-12 flex items-center justify-center">
            <span class="lucide--loader-circle animate-spin" />
         </div>
      </template>
   </div>
</template>
