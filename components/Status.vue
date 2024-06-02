<script setup>

const selected = ref(false)

const velocity = ref(0)

const gasThreshold = ref(0)

const volume = ref(0)

const DEBOUNCE_TIME = 500



// watch(velocity, debounce((value) => {
//   socketStore.sendMessage({
//     velocity: value.toString(),
//   })
// }))

// watch(volume, debounce((value) => {
//   console.log('gasThreshold', value)
//   socketStore.sendMessage({
//     volume: value.toString()
//   })
// }))

// watch(gasThreshold, debounce((value) => {
//   console.log('gasThreshold', value)
//   socketStore.sendMessage({
//     threshold: value.toString(),
//   })
// }))

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

const timeOutVolume = ref(null)
const onChangeVolume = (val) => {
  clearTimeout(timeOutVolume.value)
  timeOutVolume.value = setTimeout(() => {
    console.log('volume -->>')
    socketStore.sendMessage({
      volume: volume.value.toString()
    })
  }, DEBOUNCE_TIME)
}

const timeOutVelocity = ref(null)

const onChangeVelocity = (val) => {
  clearTimeout(timeOutVelocity.value)
  timeOutVelocity.value = setTimeout(() => {
    console.log('velocity -->>')
    socketStore.sendMessage({
      velocity: velocity.value.toString()
    })
  }, DEBOUNCE_TIME)
}

const timeOutGasThreshold = ref(null)

const onChangeGasThreshold = (val) => {
  clearTimeout(timeOutGasThreshold.value)
  timeOutGasThreshold.value = setTimeout(() => {
    console.log('gasThreshold -->>')
    socketStore.sendMessage({
      threshold: gasThreshold.value.toString()
    })
  }, DEBOUNCE_TIME)
}

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
      <URange v-model="gasThreshold" @update:modelValue="onChangeGasThreshold" :min="0" :max="1024" />
    </div>
    <hr>
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-1">
        <UIcon name="i-ph-fan-light" />
        <p>Tốc độ quạt: {{ masterStore.getFan.velocity }} - {{ `${(masterStore.getFan.velocity *100 / 255).toFixed(0)}%` }}</p>
      </div>
      <URange v-model="velocity" @update:modelValue="onChangeVelocity" :min="0" :max="255" />
    </div>
    <hr>
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-1">
        <UIcon name="i-ph-speaker-simple-low" />
        <p>Âm lượng chuông: {{ masterStore.getBuzzer.volume }} - {{ `${(masterStore.getBuzzer.volume * 100 / 255).toFixed(0)}%` }}</p>
      </div>
      <URange v-model="volume" @update:modelValue="onChangeVolume" :min="0" :max="255" />
    </div>
    <hr>

  </UCard>
</template>