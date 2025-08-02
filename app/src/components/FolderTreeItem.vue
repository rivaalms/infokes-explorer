<script setup lang="ts">
import { defineProps, shallowRef } from "vue"
import { useFileStore } from "@/stores/file"

const props = defineProps<{
   item: Model.Folder
}>()

const isChildrenShow = shallowRef(false)

function onChevronClick() {
   isChildrenShow.value = !isChildrenShow.value
}

const fileStore = useFileStore()
function onClick(item: Model.Folder) {
   if (!item.children) {
      alert(item.name)
      return
   }
   fileStore.currentDir = item
}
</script>

<template>
   <div class="flex flex-col">
      <div
         class="flex items-center gap-2 px-4 py-2 hover:bg-blue-500/5 hover:text-blue-500 rounded-lg cursor-pointer"
         @click.stop="onClick(props.item)"
      >
         <span
            v-if="props.item.children && props.item.children.length > 0"
            class="lucide--chevron-down size-4"
            :class="{ '-rotate-90': !isChildrenShow }"
            @click.stop="onChevronClick"
         />
         <span v-else class="size-4" />
         <span class="lucide--folder size-4" />
         <span class="text-sm font-medium flex-1">
            {{ props.item.name }}
         </span>
      </div>
      <template v-if="props.item.children && isChildrenShow">
         <div class="ms-4 flex flex-col">
            <template v-for="child in props.item.children">
               <FolderTreeItem :item="child" />
            </template>
         </div>
      </template>
   </div>
</template>
