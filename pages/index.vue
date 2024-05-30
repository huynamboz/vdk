<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <div class="flex flex-col gap-4">
    <Setting />
    <Status />
  </div>
</template>
