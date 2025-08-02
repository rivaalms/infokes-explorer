<script setup lang="ts">
import FolderTreeItem from "./FolderTreeItem.vue"
import { defineProps } from "vue"

const props = defineProps<{
   data: Model.Folder[]
}>()
</script>

<template>
   <div class="flex flex-col">
      <template v-for="item in props.data">
         <FolderTreeItem
            :item="item"
         />
      </template>
   </div>
</template>
