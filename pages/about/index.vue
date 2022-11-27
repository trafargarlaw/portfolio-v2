<template>
  <div>
    <h1>I am the parent view</h1>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/parent/child">Child</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/parent/child2">Child 2</NuxtLink>
        </li>
      </ul>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "about",
});
</script>
