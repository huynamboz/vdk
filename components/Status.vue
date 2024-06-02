<script setup>

const selected = ref(false)

const velocity = ref(0)

const gasThreshold = ref(0)

const volume = ref(0)

const DEBOUNCE_TIME = 500

const debounce = (fn) => {
  let timeout
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(context, args), DEBOUNCE_TIME)
  }
}

watch(velocity, debounce((value) => {
  socketStore.sendMessage({
    velocity: value.toString(),
    volume: volume.value.toString(),
    threshold: gasThreshold.value.toString()
  })
}))

watch(volume, debounce((value) => {
  console.log('gasThreshold', value)
  socketStore.sendMessage({
    threshold: gasThreshold.value.toString(),
    volume: value.toString()
  })
}))

watch(gasThreshold, debounce((value) => {
  console.log('gasThreshold', value)
  socketStore.sendMessage({
    threshold: value.toString(),
    volume: volume.value.toString()
  })
}))
const socketStore = useSocketStore()
const masterStore = useMasterStore()

watch(() => [masterStore.getSensor.threshold, masterStore.getBuzzer.volume, masterStore.getFan.velocity], (val, old) => {
  if (val[0]  !== old[0]) {
    gasThreshold.value = val[0]
  }
  if (val[1] !== old[1]) {
    volume.value = val[1]
  }
  if (val[2] !== old[2]) {
    velocity.value = val[2]
  }
})


</script>
<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-semibold leading-6">
          Trạng thái
        </h3>
        <p>Số lượng người đang kết nối: {{ masterStore.getTotalUsers }}</p>
      </div>
    </template>
    <div class="flex flex-col gap-2">
      <!-- <p>Khí gas</p> -->
      <template>
        <UMeterGroup :max="1024">
          <template #indicator>
            <div class="flex gap-1.5 justify-between text-sm">
              <p>0</p>
              <p class="text-gray-500 dark:text-gray-400">
                1024
              </p>
            </div>
          </template>

          <UMeter :value="masterStore.getSensor.value" :color="masterStore.getSensor.value  < gasThreshold ? 'green' :  'red'" :label="`Khí gas ${masterStore.getSensor.value} - `" icon="i-heroicons-cog-6-tooth" />
        </UMeterGroup>
      </template>
    </div>
    <hr>
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-1">
        <UIcon name="i-ph-cloud-warning" />
        <p>Ngưỡng cảnh báo khí gas: {{ masterStore.getSensor.threshold }} - {{ (masterStore.getSensor.threshold * 100 /1024).toFixed(0) }}%</p>
      </div>
      <URange v-model="gasThreshold" :min="200" :max="900" />
    </div>
    <hr>
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-1">
        <UIcon name="i-ph-fan-light" />
        <p>Tốc độ quạt: {{ masterStore.getFan.velocity }} - {{ `${masterStore.getFan.velocity *100 / 255}%` }}</p>
      </div>
      <URange v-model="velocity" :min="0" :max="255" />
    </div>
    <hr>
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-1">
        <UIcon name="i-ph-speaker-simple-low" />
        <p>Âm lượng chuông: {{ masterStore.getBuzzer.volume }} - {{ `${masterStore.getBuzzer.volume * 100 / 255}%` }}</p>
      </div>
      <URange v-model="volume" :min="0" :max="255" />
    </div>
    <hr>

  </UCard>
</template>