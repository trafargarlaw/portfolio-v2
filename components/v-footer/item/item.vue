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
  <li
    v-if="type === 'default'"
    class="px-[14px] py-[12px] border-r border-lines"
  >
    <nuxt-link class="max-h-6" :to="to"><slot /></nuxt-link>
  </li>
  <div
    v-else-if="type === 'left'"
    class="px-[14px] py-[12px] border-l ml-auto border-lines"
  >
    <a class="flex gap-1 items-center max-h-6" :href="to"><slot /></a>
  </div>
</template>
