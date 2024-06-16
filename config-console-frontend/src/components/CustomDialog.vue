<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  parameter: Object
})
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Are you sure you want to delete this value parameter?</h2>
      <div class="buttons">
        <button class="close-button" @click="close">Close</button>
        <button class="save-button" @click="saveEdit">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 20px;
  font-weight: 400;
  color: var(--color-heading);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: var(--color-background);
  padding: 100px;
  border-radius: 15px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: fit-content;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  width: 70px;
  background: var(--gradient-delete-button);
  border: none;
  padding: 10px;
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}

.save-button {
  width: 70px;
  background: var(--gradient-edit-button);
  border: none;
  padding: 10px;
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
