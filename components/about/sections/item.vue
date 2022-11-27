<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <li class="px-6 py-4">
    <nuxt-link :to="to">
      <component :is="icon"></component>
    </nuxt-link>
  </li>
</template>
