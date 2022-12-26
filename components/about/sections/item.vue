<script setup>
const props = defineProps({
  icon: {
    type: Object,
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
    <nuxt-link class="section-item-link opacity-40" :to="to">
      <component :is="icon"></component>
    </nuxt-link>
  </li>
</template>
