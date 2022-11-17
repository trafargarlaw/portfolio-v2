<template>
  <nav class="flex text-secondary-blue-gray border-b border-lines">
    <span class="pl-[22px] pr-[113px] py-[14px] border-r border-lines"
      >houdaifa-chergaoui</span
    >
    <ul class="flex">
      <v-header-item to="/">_hello</v-header-item>
      <v-header-item to="/about">_about-me</v-header-item>
      <v-header-item to="/projects">_projects</v-header-item>
    </ul>
    <v-header-item type="left" to="/contact">_contact-me</v-header-item>
  </nav>
</template>
