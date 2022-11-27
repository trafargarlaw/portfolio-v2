<script setup></script>
<template>
  <div class="border-r border-lines">
    <button
      class="text-white flex items-center gap-2 px-[14px] py-2 border-b border-lines w-full"
    >
      <svg
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z"
          fill="white"
        />
      </svg>
      personal-info
    </button>
    <div class="flex flex-col px-4 pt-3">
      <about-file folderColor="fill-accent-orange-red">bio</about-file>
      <about-file folderColor="fill-accent-green-cyan">interests</about-file>
      <about-file folderColor="fill-[#3A49A4]">education</about-file>
    </div>
    <button
      class="text-white flex items-center gap-2 px-[14px] py-2 border-t border-b border-lines w-full"
    >
      <svg
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z"
          fill="white"
        />
      </svg>
      contacts
    </button>
    <div class="flex flex-col pl-4 pr-[11px] pt-3 gap-2">
      <div class="flex text-sm items-center text-secondary-blue-gray gap-2">
        <icons-mail /> <span>chergaoui@houdaifa.com</span>
      </div>
      <div class="flex text-sm items-center text-secondary-blue-gray gap-2">
        <icons-phone /> <span>+212 611750977</span>
      </div>
    </div>
  </div>
</template>
