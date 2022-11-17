<template>
  <div class="bg-primary-rich-black-2 w-fit rounded-lg">
    <span
      class="p-4 flex justify-end bg-cover rounded-t-lg bg-center bg-[url('https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80')] h-[146px] w-[291px] md:w-[371px]"
    >
      <icons-box-react />
    </span>
    <div class="pl-8 py-6 pb-8">
      <p class="text-lg max-w-[22ch] md:max-w-[25ch] text-secondary-blue-gray">
        <slot />
      </p>
      <v-button class="mt-6">view-project</v-button>
    </div>
  </div>
</template>
