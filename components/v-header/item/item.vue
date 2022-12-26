<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  to: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<"default" | "left">,
    default: "default",
  },
});
</script>

<template>
  <li v-if="type === 'default'" class="flex">
    <nuxt-link class="px-8 py-4 border-r border-lines page-route" :to="to"
      ><slot
    /></nuxt-link>
  </li>
  <div
    v-else-if="type === 'left'"
    class="px-[22px] py-4 border-l ml-auto border-lines"
  >
    <nuxt-link :to="to"><slot /></nuxt-link>
  </div>
</template>
