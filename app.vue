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
// Chuỗi thời gian đầu vào
function calculateDelay (val) {
  const inputTimeString = val;

// Chuyển đổi chuỗi thời gian thành đối tượng Date
function parseDateTime(dateTimeString) {
  const [datePart, timePart] = dateTimeString.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes, seconds, milliseconds] = timePart.split(/[:]/).map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
}

const inputTime = parseDateTime(inputTimeString);

// Lấy thời gian hiện tại
const currentTime = new Date();

// Tính độ lệch thời gian (ms)
const timeDifference = currentTime - inputTime;

// console.log(`Input Time: ${inputTime}`);
// console.log(`Current Time: ${currentTime}`);
// console.log(`Time Difference (ms): ${timeDifference}`);
return timeDifference;
}

const isLoading = ref(true)
watch(() => messageSocket.value,
(val) => {
  isLoading.value = false
  if (val.totalUsers) {
    masterStore.setTotalUsers(val.totalUsers)
  }
  // console.log('val', val)
  if (val.sensor) {
    masterStore.setSensor(val.sensor)
  }
  if (val.door !== undefined && val.sensor) {
    masterStore.setDoor(Boolean(val.door))
  }
  if (val.buzzer && val.sensor) {
    masterStore.setBuzzer(val.buzzer)
  }
  if (val.fan && val.sensor) {
    masterStore.setFan(val.fan)
  }
  if (val.automatic !== undefined && val.sensor) {
    masterStore.setAutomatic(Boolean(val.automatic))
  }
  if (val.time) {
    masterStore.setDelay(calculateDelay(val.time))
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
    <div v-if="isLoading" class="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-[#717171a1] z-50">
      <UIcon name="i-svg-spinners-270-ring-with-bg text-white text-4xl" />
      <p class="text-white">Đang kết nối websocket...</p>
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
