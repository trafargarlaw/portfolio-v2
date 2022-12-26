<script setup>
defineProps({
  folderColor: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
    required: true,
  },
});

const isOpen = ref(false);
</script>

<template>
  <button @click="isOpen = !isOpen" class="flex items-center gap-3 py-1">
    <icons-chevron-right class="transition" :class="isOpen && 'rotate-90'" />
    <div class="flex items-center gap-2">
      <icons-file :class="folderColor" />
      <span class="text-secondary-blue-gray">
        <slot />
      </span>
    </div>
  </button>
  <ul class="px-5" v-if="isOpen">
    <li
      class="flex gap-2 items-center text-secondary-blue-gray"
      v-for="file in files"
      :key="file.fileName"
    >
      <component :is="file.icon"></component>
      <nuxt-link :to="`personal/${file.fileName}`">{{
        file.fileName
      }}</nuxt-link>
    </li>
  </ul>
</template>
