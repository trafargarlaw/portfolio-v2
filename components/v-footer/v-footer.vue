<template>
  <footer class="flex text-secondary-blue-gray border-t border-lines">
    <span class="pl-[21px] pr-[17px] py-[12px] h-fit border-r border-lines"
      >find me in:</span
    >
    <ul class="flex">
      <v-footer-item to="/">
        <icons-twitter />
      </v-footer-item>
      <v-footer-item to="/about">
        <icons-instagram />
      </v-footer-item>
    </ul>
    <v-footer-item type="left" to="https://github.com/trafargarlaw"
      >@trafargarlaw
      <icons-github />
    </v-footer-item>
  </footer>
</template>
