<script setup>
const router = useRouter();

const filesData = {
  personal: {
    fileName: "personal-info",
    content: [
      {
        folderName: "bio",
        folderColor: "fill-accent-orange-red",
        files: [
          {
            fileName: "biography",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },
      {
        folderName: "interests",
        folderColor: "fill-accent-green-cyan",
        files: [
          {
            fileName: "biography",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },
      {
        folderName: "education",
        folderColor: "fill-accent-indigo",
        files: [
          {
            fileName: "biography",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },
    ],
  },

  professional: {
    fileName: "professional-info",
    content: [
      {
        folderName: "experience",
        folderColor: "fill-accent-orange-red",
        files: [
          {
            fileName: "experience",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },

      {
        folderName: "skills",
        folderColor: "fill-accent-green-cyan",
        files: [
          {
            fileName: "skills",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },

      {
        folderName: "projects",
        folderColor: "fill-accent-indigo",
        files: [
          {
            fileName: "certificates",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },
    ],
  },
  hobbies: {
    fileName: "hobbies",
    content: [
      {
        folderName: "music",
        folderColor: "fill-accent-orange-red",
        files: [
          {
            fileName: "music",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },

      {
        folderName: "books",
        folderColor: "fill-accent-green-cyan",
        files: [
          {
            fileName: "books",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },

      {
        folderName: "games",
        folderColor: "fill-accent-indigo",
        files: [
          {
            fileName: "games",
            icon: resolveComponent("icons-markdown"),
          },
        ],
      },
    ],
  },
};

const currentFilesData = computed(() => {
  return filesData[router.currentRoute.value.fullPath.split("/")[2]];
});
</script>
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
      {{ currentFilesData.fileName }}
    </button>
    <div class="flex flex-col px-4 py-3">
      <about-file
        v-for="folder in currentFilesData.content"
        :key="folder.folderName"
        :folderColor="folder.folderColor"
        :files="folder.files"
      >
        {{ folder.folderName }}
      </about-file>
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
        <icons-mail /> <span>hudy@hudy.com</span>
      </div>
      <div class="flex text-sm items-center text-secondary-blue-gray gap-2">
        <icons-phone /> <span>+212 610000000</span>
      </div>
    </div>
  </div>
</template>
