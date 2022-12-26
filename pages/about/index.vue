<template>
  <ContentDoc class="block" />
</template>

<script setup>
definePageMeta({
  layout: "about",
  middleware: (to) => {
    if (to.name === "about") {
      return { name: "about-personal-biography" };
    }
  },
});
// always send to /about/personal/biography if there is no other params after /about
</script>

<style>
pre code span.line {
  counter-increment: line;
  display: block;
  position: relative;
  padding-left: 2.5em;
}
pre code span.line:before {
  content: counter(line);
  position: absolute;
  left: 0;
  color: #8b949e;
}
</style>
