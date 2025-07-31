<script setup lang="ts">
import FileTree from "./FileTree.vue"
import { defineProps, shallowRef } from "vue"
import { useFileStore } from "@/stores/file"

const props = defineProps<{
   id: number
   label: string
   children?: Model.File[]
}>()

const isChildrenShow = shallowRef(false)

function onClick() {
   if (useFileStore().selected?.id != props.id && isChildrenShow.value) {
      return
   }
   if (props.children) {
      isChildrenShow.value = !isChildrenShow.value
   }
}
</script>

<template>
   <div class="flex flex-col">
      <div
         class="flex items-center px-4 py-2 hover:bg-blue-500/5 hover:text-blue-500 rounded-lg cursor-pointer"
         @click="onClick"
      >
         <span class="text-sm font-medium flex-1">
            {{ props.label }}
         </span>
         <span
            v-if="props.children"
            class="lucide--chevron-down"
            :class="{ 'rotate-180': isChildrenShow }"
         />
      </div>
      <template v-if="props.children && isChildrenShow">
         <div class="ms-4 flex flex-col gap-1">
            <FileTree :data="props.children" />
         </div>
      </template>
   </div>
</template>
