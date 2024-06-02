<script setup>

const selected = ref(false)
const autoMode = ref(false)
const fan = ref(false)
const chip = ref(false)

const socketStore = useSocketStore()

const masterStore = useMasterStore()
// convert to 0, 1
function onChangeMode() {
  // autoMode.value = !autoMode.value
  socketStore.sendMessage({
    door: convertToNumber(masterStore.getDoor),
    automatic: convertToNumber(!autoMode.value),
    fan: convertToNumber(fan.value)
  })
}

function openDoor() {
  socketStore.sendMessage({
    door: convertToNumber(!masterStore.getDoor),
    automatic: convertToNumber(autoMode.value),
    fan: convertToNumber(masterStore.getFan.on)
  })
}

function changeFan() {
  socketStore.sendMessage({
    fan: convertToNumber(!masterStore.getFan.on),
    door: convertToNumber(masterStore.getDoor),
    automatic: convertToNumber(autoMode.value)
  })
}

watch(() => masterStore.getAutomatic, (val) => {
  autoMode.value = val
})

function convertToNumber(value) {
  return value ? "1" : "0"
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
      <div class="flex justify-between">
        Độ trễ: <p class="w-16 text-right">
          {{ masterStore.getDelay }}ms
        </p>
      </div>
    </template>

    <div class="flex justify-between flex-wrap gap-3 w-full whitespace-nowrap">
      <!-- left -->
      <div class="grid grid-cols-[150px_auto] items-center gap-2">
        <div class="flex items-center gap-1">
          <UTooltip text="Hệ thống sẽ tự động mở cửa/ đóng cửa">
            <UIcon name="i-ph-warning-circle" />
          </UTooltip>
          <p>Hệ thống tự động:</p>
        </div>
        <UToggle @click="onChangeMode" :model-value="Boolean(masterStore.getAutomatic)" />
        <div class="flex items-center gap-1">
          <UTooltip text="Trạng thái cửa">
            <UIcon name="i-ph-warning-circle" />
          </UTooltip>
          <p>Cửa:</p>
        </div>
        <UToggle @click="openDoor" :model-value="masterStore.getDoor" :disabled="autoMode"/>
      </div>
      <!-- end left -->

      <!-- right -->
      <div class="grid grid-cols-[150px_auto] items-center gap-2">
        <div class="flex items-center gap-1">
          <UTooltip text="Trạng thái của quạt">
            <UIcon name="i-ph-warning-circle" />
          </UTooltip>
          <p>Quạt:</p>
        </div>
        <UToggle :model-value="masterStore.getFan.on" @click="changeFan" :disabled="autoMode"/>
        <div class="flex items-center gap-1">
          <UTooltip text="Trạng thái chuông báo">
            <UIcon name="i-ph-warning-circle" />
          </UTooltip>
          <p>Chuông báo:</p>
        </div>
        <UToggle @click="changeRing" :model-value="masterStore.getBuzzer.on" :disabled="true"/>
      </div>
      <!-- end right -->
    </div>
    <hr>
  </UCard>
</template>