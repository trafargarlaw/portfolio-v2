<template>
  <div
    class="h-full flex flex-col bg-primary-maastricht-blue border border-lines rounded-lg"
  >
    <v-header></v-header>
    <div class="flex-1">
      <slot />
    </div>
    <v-footer></v-footer>
  </div>
</template>
