<script setup>
const personal = resolveComponent("icons-personal");
const professional = resolveComponent("icons-professional");
const hobbies = resolveComponent("icons-hobbies");
</script>

<template>
  <ul class="border-r flex flex-col w-fit border-lines h-full">
    <about-sections-item to="/about/personal" :icon="personal" />
    <about-sections-item to="/about/professional" :icon="professional" />
    <about-sections-item to="/about/hobbies" :icon="hobbies" />
  </ul>
</template>
