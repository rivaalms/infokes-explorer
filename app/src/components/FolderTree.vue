<script setup lang="ts">
import FolderTreeItem from "./FolderTreeItem.vue"
import { defineProps } from "vue"
import { useFileStore } from "@/stores/file"

const props = defineProps<{
   data: Model.Folder[]
}>()

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
   <template v-for="item in props.data">
      <FolderTreeItem
         :id="item.id"
         :label="item.name"
         :children="item.children"
         @click.stop="onClick(item)"
      />
   </template>
</template>
