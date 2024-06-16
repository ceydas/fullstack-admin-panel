<template>
  <div class="modal-overlay" @click="close">
    <div class="modal">
      <slot></slot>
      <button class="close-button" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])
const props = defineProps({
  parameterKey: {
    type: String,
    required: true
  },
  parameterValue: {
    type: [String],
    required: true
  },
  parameterDescription: {
    type: [String],
    required: true
  }
})

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.161);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;

  padding: 100px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  width: 70px;
  background-color: #3498db;
  border: none;
  padding: 10px;
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}
</style>
