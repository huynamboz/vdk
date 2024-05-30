<script setup>

const selected = ref(false)
const autoMode = ref(false)
const fan = ref(false)
const chip = ref(false)

const socketStore = useSocketStore()

const masterStore = useMasterStore()
function onChangeMode() {
  autoMode.value = !autoMode.value
}

function changeRing() {
  // chip.value = !chip.value
  socketStore.sendMessage({
    name: "a",
    message: chip.value ? "ON" : "OFF"
  })
}
</script>
<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        Cài đặt chung
      </h3>
    </template>

    <div class="flex justify-between w-full whitespace-nowrap">
      <!-- left -->
      <div class="grid grid-cols-[auto_auto] items-center gap-2">
        <div class="flex items-center gap-1">
          <UTooltip text="Hệ thống sẽ tự động mở cửa/ đóng cửa">
            <UIcon name="i-ph-warning-circle" />
          </UTooltip>
          <p>Hệ thống tự động:</p>
        </div>
        <UToggle @click="onChangeMode" :model-value="autoMode" />
        <div class="flex items-center gap-1">
          <UTooltip text="Trạng thái cửa">
            <UIcon name="i-ph-warning-circle" />
          </UTooltip>
          <p>Cửa:</p>
        </div>
        <UToggle :model-value="masterStore.getServo" :disabled="autoMode"/>
      </div>
      <!-- end left -->

      <!-- right -->
      <div class="grid grid-cols-2 items-center gap-2">
        <div class="flex items-center gap-1">
          <UTooltip text="Hệ thống sẽ tự động mở cửa/ đóng cửa">
            <UIcon name="i-ph-warning-circle" />
          </UTooltip>
          <p>Quạt:</p>
        </div>
        <UToggle v-model="fan" />
        <div class="flex items-center gap-1">
          <UTooltip text="Trạng thái cửa">
            <UIcon name="i-ph-warning-circle" />
          </UTooltip>
          <p>Chuông báo:</p>
        </div>
        <UToggle @click="changeRing" :model-value="masterStore.getBuzzer.on" :disabled="!autoMode"/>
      </div>
      <!-- end right -->
    </div>
    <hr>
  </UCard>
</template>