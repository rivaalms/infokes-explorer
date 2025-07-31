<script setup lang="ts">
import FileTree from "./components/FileTree.vue"
import { $fetch } from "@/utils/$fetch"
import { onMounted, ref } from "vue"
import { useFileStore } from "@/stores/file"

const fileStore = useFileStore()

const data = ref<Model.File[]>([])

onMounted(async () => {
   const response = await $fetch<API.Response<Model.File[]>>("/files", {
      method: "get",
   })
   data.value = response.data.map((item) => ({ ...item, selected: false }))
})

function onItemClick(item: Model.File) {
   if (item.type == "dir") {
      fileStore.select(item)
   } else {
      alert(item.name)
   }
}
</script>

<template>
   <div class="h-screen p-5">
      <div class="h-full rounded-xl border border-gray-200 shadow-lg">
         <div class="h-full p-4 grid grid-cols-4 gap-4">
            <div class="flex flex-col gap-1 border-e border-gray-200 pe-4">
               <FileTree :data="data" />
            </div>
            <div class="col-span-3">
               <div class="grid grid-cols-6 gap-4">
                  <template v-for="item in fileStore.selected?.children">
                     <div
                        class="flex flex-col items-center hover:bg-blue-500/5 p-4 rounded-lg cursor-pointer"
                        @click="onItemClick(item)"
                     >
                        <span
                           class="size-12!"
                           :class="[
                              item.type == 'dir'
                                 ? 'lucide--folder'
                                 : 'lucide--file',
                           ]"
                        />
                        <span class="text-sm font-medium">
                           {{ item.name }}
                        </span>
                     </div>
                  </template>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
