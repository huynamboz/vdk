<script setup>
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', href: '/icon.png' }]
})

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  title: 'Trang quản lý',
  description:
    'A Nuxt demo hosted with Edge-side rendering, authentication and queyring a SQLite database',
  ogImage: '/social-image.png',
  twitterImage: '/social-image.png',
  twitterCard: 'summary_large_image'
})

const socketStore = useSocketStore()
const messageSocket = computed(() => socketStore.message)

const masterStore = useMasterStore()

onBeforeMount(() => {
  socketStore.connect()
})

watch(() => messageSocket.value,
(val) => {
  if (val.totalUsers) {
    masterStore.setTotalUsers(val.totalUsers)
  }
  // console.log('val', val)
  if (val.sensor) {
    masterStore.setSensor(val.sensor)
  }
  if (val.door !== undefined) {
    masterStore.setDoor(Boolean(val.door))
  }
  if (val.buzzer) {
    masterStore.setBuzzer(val.buzzer)
  }
  if (val.fan) {
    masterStore.setFan(val.fan)
  }
  if (val.automatic !== undefined) {
    masterStore.setAutomatic(val.automatic)
  }
})
</script>

<template>
  <UContainer class="min-h-screen flex flex-col justify-center">
    <div class="mb-2 text-right">
      <UButton
        square
        variant="ghost"
        color="black"
        :icon="$colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        @click="toggleColorMode"
      />
    </div>

    <NuxtPage />

    <footer class="text-center mt-2">
      <NuxtLink
        href="https://github.com/huynamboz/vdk"
        target="_blank"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        GitHub
      </NuxtLink>
    </footer>
  </UContainer>
  <UNotifications />
</template>

<style lang="postcss">
body {
  @apply font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>
