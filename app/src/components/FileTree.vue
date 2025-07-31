<script setup lang="ts">
import FileTreeItem from "./FileTreeItem.vue"
import { defineProps } from "vue"
import { useFileStore } from "@/stores/file"

const props = defineProps<{
   data: Model.File[]
}>()

const fileStore = useFileStore()

function onClick(item: Model.File) {
   if (!item.children) {
      alert(item.name)
      return
   }
   fileStore.select(item)
}
</script>

<template>
   <template v-for="item in props.data">
      <FileTreeItem
         :id="item.id"
         :label="item.name"
         :children="item.children"
         @click.stop="onClick(item)"
      />
   </template>
</template>
