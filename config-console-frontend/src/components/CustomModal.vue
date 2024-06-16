<script setup lang="ts">
import { ref, watch } from 'vue'
import deepClone from '../util/config-util'

const props = defineProps({
  parameter: Object
})

const editData = ref(deepClone({ ...props.parameter }))

const addValueAndTagData = ref({ value_tag: 'default', value: '' })

const emit = defineEmits(['close', 'save'])

const close = () => {
  emit('close')
}

watch(props, (newVal) => {
  editData.value = { ...newVal.parameter }
  addValueAndTagData.value = { value_tag: 'default', value: '' }
})

const saveEdit = () => {
  emit('save', editData.value)
}

const addValueAndTag = () => {
  if (editData.value.value[0].value) {
    editData.value.value.push({ ...addValueAndTagData.value })
    addValueAndTagData.value = { value_tag: 'default', value: '' }
  }
}

const deleteValueAndTag = (index: number) => {
  editData.value.value.splice(index, 1)
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Edit Parameters</h2>
      <div class="input-item">
        <p class="input-title">Parameter Key:</p>
        <input v-model="editData.key" placeholder="Edit Parameter Key" />
      </div>
      <br />
      <div class="input-item">
        <p class="input-title">Value:</p>
        <div class="values-container">
          <div class="values" v-for="(val, index) in editData.value" :key="val.value_tag">
            <input v-model="val.value_tag" class="value-tag" />
            <input v-model="val.value" class="value-value" />
            <button @click="deleteValueAndTag(index)" class="close-button-x">X</button>
          </div>
        </div>
      </div>
      <br />
      <div class="parameter-value-input">
        <p class="input-title">New Value:</p>
        <input v-model="addValueAndTagData.value_tag" placeholder="Tag" />
        <input v-model="addValueAndTagData.value" placeholder="Value" />
        <button @click="addValueAndTag" class="add-btn">Add</button>
      </div>
      <br />
      <input v-model="editData.description" placeholder="Edit Description" />
      <br />
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
  display: flex;
  width: 500px;
  height: max-content;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-item {
  display: inline-flex;
  align-items: center;
}
.input-title {
  font-weight: 500;
  display: inline-flex;
  margin-right: 10px;
}

input {
  padding: 10px;
  border: 1px solid #2d3551;
  border-radius: 8px;
  background-color: transparent;
  color: white;
  width: auto;
  display: inline;
  font-size: 14px;
}

input:focus {
  border: 1px solid var(--color-border);
  outline: none;
  box-shadow: none;
}

.values {
  display: inline-flex;
  align-items: center;
  margin-right: 30px;
  margin-bottom: 5px;
  gap: 2px;
}

.value-value {
  display: inline-flex;
  width: 5ch;
}

.value-tag {
  cursor: pointer;
  font-weight: 300;
  font-size: 10px;
  display: inline-flex;
  padding: 5px;
  border-radius: 5px;
  background: var(--gradient-tag);
  width: 5ch;
  margin-right: 10px;
  text-align: start;
}

.value-tag:focus {
  border: none;
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

.close-button-x {
  margin-left: 3px;
  background: var(--gradient-delete-button);
  width: fit-content;
  border: none;
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

.parameter-value-input {
  width: fit-content;
  grid-column: 2;
}

.parameter-value-input input {
  align-content: start;
  width: 5ch;
  margin-right: 10px;
}

.add-btn {
  width: 60px;
  border: none;
  padding: 8px;
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  background: var(--gradient-add-button);
  grid-column: 5;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

@media (max-width: 700px) {
  .modal-overlay {
    overflow: auto;
  }
  .modal {
    padding: 20px;
    border-radius: 15px;
    min-width: 200px;
    display: flex;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }
}
</style>
