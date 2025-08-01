<script setup lang="ts">
import FolderTree from "./FolderTree.vue"
import { defineProps, shallowRef } from "vue"

const props = defineProps<{
   id: number
   label: string
   children?: Model.Folder[]
}>()

const isChildrenShow = shallowRef(false)

function onChevronClick() {
   isChildrenShow.value = !isChildrenShow.value
}
</script>

<template>
   <div class="flex flex-col">
      <div
         class="flex items-center gap-2 px-4 py-2 hover:bg-blue-500/5 hover:text-blue-500 rounded-lg cursor-pointer"
      >
         <span
            v-if="props.children && props.children.length > 0"
            class="lucide--chevron-down size-4"
            :class="{ '-rotate-90': !isChildrenShow }"
            @click.stop="onChevronClick"
         />
         <span v-else class="size-4" />
         <span class="lucide--folder size-4" />
         <span class="text-sm font-medium flex-1">
            {{ props.label }}
         </span>
      </div>
      <template v-if="props.children && isChildrenShow">
         <div class="ms-4 flex flex-col gap-1">
            <FolderTree :data="props.children" />
         </div>
      </template>
   </div>
</template>
