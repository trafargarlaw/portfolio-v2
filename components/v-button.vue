<script setup>
defineProps({
  type: {
    type: String,
    default: "default",
  },
});
</script>
<template>
  <button
    v-if="type === 'default'"
    class="bg-[#1C2B3A] px-[14px] py-[10px] rounded-lg text-white font-[450] hover:bg-[#263B50] transition-colors"
  >
    <slot></slot>
  </button>
  <button
    v-else-if="type === 'ghost'"
    class="px-[14px] py-[10px] rounded-lg border border-white text-white font-[450] hover:bg-[#263B50] transition-colors"
  >
    <slot></slot>
  </button>
  <button
    v-else-if="type === 'primary'"
    class="bg-accent-orange-yellow px-[14px] py-[10px] rounded-lg text-black font-[450] hover:bg-[#FFAC6B] transition-colors"
  >
    <slot></slot>
  </button>
</template>
