<script setup lang="ts">
import { ref, onMounted } from 'vue'
import loadingIcon from '../assets/codeway-loading.svg'

const showLoading = ref(true)

const toggleVisibility = () => {
  showLoading.value = !showLoading.value
}

onMounted(() => {
  setInterval(() => {
    toggleVisibility()
  }, 200)
})
</script>

<template>
  <transition name="fade" appear>
    <div v-if="showLoading">
      <img :src="loadingIcon" alt="Loading Image" class="loading-icon" />
    </div>
  </transition>
</template>
<style>
.loading-icon {
  width: 100px;
  height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: ease-in-out 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
