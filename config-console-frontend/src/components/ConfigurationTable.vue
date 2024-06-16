<script setup lang="ts">
import { ref } from 'vue'
import CustomModal from './CustomModal.vue'

const isModalActive = ref(false)

const showModal = () => {
  isModalActive.value = true
}

const closeModal = () => {
  isModalActive.value = false
}

const parameters = ref([
  {
    key: 'min_version',
    value: '1.4.4',
    description: 'Minimum required version of the app',
    createDate: '10/05/2021 01:58'
  },
  {
    key: 'latest_version',
    value: '1.4.7',
    description: 'Latest version of the app',
    createDate: '10/05/2021 01:58'
  },
  {
    key: 'pricing_tier',
    value: 't6',
    description: 'Pricing tier of the user',
    createDate: '07/07/2021 11:13'
  },
  {
    key: 'scroll',
    value: '5',
    description: 'Index of Scroll Paywall for free users.',
    createDate: '25/08/2021 10:22'
  },
  {
    key: 'scroll_limit',
    value: '13',
    description: 'Index of Scroll Limit Paywall for free users.',
    createDate: '25/08/2021 10:23'
  }
])

const newParameter = ref({ key: '', value: '', description: '', createDate: '' })

const addParameter = () => {
  if (newParameter.value.key && newParameter.value.value && newParameter.value.description) {
    newParameter.value.createDate = getCurrentTime()
    parameters.value.push({ ...newParameter.value })
    newParameter.value = { key: '', value: '', description: '', createDate: '' }
  }

  //todo: send backend api post request
}

const editParameterData = ref({ key: '', value: '', description: '', createDate: '' })

const editParameter = (index: number) => {
  editParameterData.value = { ...parameters.value[index] }
}
const saveParameter = (index: number) => {
  parameters.value[index] = { ...editParameterData.value }
}

const deleteParameter = (index: number) => {
  parameters.value.splice(index, 1)

  //todo: send backend api delete request
}

function getCurrentTime(): string {
  const now = new Date()

  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const year = now.getFullYear()

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${month}/${day}/${year} ${hours}:${minutes}`
}
</script>

<template>
  <div class="table-container">
    <div class="table-header">Parameter Key</div>
    <div class="table-header">Value</div>
    <div class="table-header">Description</div>
    <div class="table-header">Create Date</div>
    <div class="table-header">Actions</div>
    <div v-for="(parameter, index) in parameters" :key="index" class="table-row">
      <div class="table-item">{{ parameter.key }}</div>
      <div class="table-item">{{ parameter.value }}</div>
      <div class="table-item">{{ parameter.description }}</div>
      <div class="table-item">{{ parameter.createDate }}</div>
      <div class="table-item">
        <button @click="showModal" class="edit-btn">Edit</button>
        <CustomModal v-if="isModalActive" @close="closeModal" />
        <button @click="deleteParameter(index)" class="delete-btn">Delete</button>
      </div>
    </div>

    <div class="parameter-key-input">
      <input v-model="newParameter.key" placeholder="New Parameter" />
    </div>
    <div class="parameter-value-input">
      <input v-model="newParameter.value" placeholder="Value" />
    </div>
    <div class="parameter-description-input">
      <input v-model="newParameter.description" placeholder="New Description" />
    </div>
    <button @click="addParameter" class="add-btn">Add</button>
  </div>

  <div class="card-container">
    <div class="card" v-for="(parameter, index) in parameters" :key="index">
      <div class="card-header">
        <div class="parameter-group">
          <h2><b>Parameter Key: </b>{{ parameter.key }}</h2>
        </div>
        <div class="parameter-group">
          <h2><b>Value: </b>{{ parameter.value }}</h2>
        </div>
        <div class="parameter-group">
          <h2> <b>Description: </b> {{ parameter.description }}</h2>
        </div>

        <div class="parameter-group">
          <h2><b>Create Date: </b>{{ parameter.createDate }}</h2>
        </div>
      </div>
      <div class="card-actions">
        <button @click="editParameter(index)" class="edit-btn">Edit</button>
        <button @click="deleteParameter(index)" class="delete-btn">Delete</button>
      </div>
      <div v-if="editIndex === index" class="edit-form">
        <input v-model="editParameterData.key" placeholder="Edit Parameter Key" />
        <input v-model="editParameterData.value" placeholder="Edit Value" />
        <input v-model="editParameterData.description" placeholder="Edit Description" />
        <input v-model="editParameterData.createDate" placeholder="Edit Create Date" />
        <button @click="saveParameter(index)" class="save-btn">Save</button>
        <button @click="cancelEdit" class="cancel-btn">Cancel</button>
      </div>
    </div>
    <div class="card add-card">
      <input v-model="newParameter.key" placeholder="New Parameter" />
      <input v-model="newParameter.value" placeholder="Value" />
      <input v-model="newParameter.description" placeholder="New Description" />
      <button @click="addParameter" class="add-btn">Add</button>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-top: 5vh;
  padding: 40px;
}

.table-row {
  display: contents; /* Allows each row to be treated as part of the table */
}

.table-header {
  color: var(--color-heading);
}

.table-item {
  font-weight: 300;
  font-size: 14px;
  color: var(--color-p);
}

.edit-btn,
.delete-btn,
.add-btn {
  width: 60px;
  border: none;
  padding: 8px;
  color: white;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}

.edit-btn {
  background: var(--gradient-edit-button);
  margin-right: 10px;
}

.delete-btn {
  background: var(--gradient-delete-button);
}

.add-btn {
  background: var(--gradient-add-button);
  grid-column: 5;
}

input {
  padding: 10px;
  border: 1px solid #2d3551;
  border-radius: 8px;
  background-color: transparent;
  color: white;
  font-size: 14px;
  width: 90%;
}
input:focus {
  border: 1px solid var(--color-border); /* Example border color */
  outline: none; /* Remove default outline */
  box-shadow: none; /* Remove any box-shadow */
}

.parameter-key-input {
  grid-column: 1;
  align-content: start;
  width: 90%;
}

.parameter-value-input {
  grid-column: 2;
  width: 90%;
}

.parameter-description-input {
  grid-column: 3/5;
}

.card-container {
  display: none;
}

@media (max-width: 700px) {
  .table-container {
    display: none;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px;
  }

  .parameter-group {
    display: flex;
    align-items: start;
    align-content: center;
    gap: 0.3rem;
    margin-bottom: 0.9rem;
  }

  .card {
    border: 1px solid white;
    border-radius: 10px;
    padding: 20px;
    color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: calc(100% - 10px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  b {
    font-weight:500;
  }
  h2 {
    font-size: 15px;
    color: var(--color-p);
    font-weight: 300;
    margin: 0;
  }

  .card-body {
    margin-bottom: 20px;
  }

  .card-actions {
    display: flex;
    justify-content: center;
  }

  .edit-btn,
  .delete-btn,
  .add-btn,
  .save-btn,
  .cancel-btn {
    width: 60px;
    border: none;
    padding: 10px;
    color: white;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }

  .add-btn {
    align-self: center;
  }

  .add-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: none;
  }

  input {
    padding: 20px;
  }
}
</style>
