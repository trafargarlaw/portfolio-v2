<template>
  <div class="relative w-fit">
    <input id="checkbox" type="checkbox" class="hidden peer" />
    <label
      for="checkbox"
      class="peer-checked:bg-secondary-blue-gray flex items-center justify-center h-5 w-5 bg-primary-rich-black-2 border-secondary-blue-gray hover:outline outline-[#607b964D] border-[2px] rounded-[2px]"
    >
    </label
    ><svg
      class="peer-checked:block pointer-events-none hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.88574 7.56402L11.4717 0.977402L12.4855 1.99051L4.88574 9.59024L0.32605 5.03054L1.33916 4.01744L4.88574 7.56402Z"
        fill="white"
      />
    </svg>
  </div>
</template>
