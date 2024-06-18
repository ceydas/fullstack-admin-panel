<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import CustomModal from './CustomModal.vue'
import getCurrentTime from '@/util/config-util'
import type { Parameter } from '@/types/Parameter'
import authenticatedRequest from '../middleware/config-middleware'

const isModalActive = ref(false)

const editIndex = ref(-1) // Currently edited parameter index

const user = ref<User | null>(null) // Reference to the current user, we need their token

const parameters = reactive<Parameter[]>([]) // Parameters to display to the user

const emptyParameters: Parameter = {
  key: '',
  value: [{ value_tag: 'default', value: '' }],
  description: '',
  createDate: ''
}

// Parameters in the input field
const newParameter = reactive<Parameter>({...emptyParameters})

const currentParameters = reactive<Parameter>({ ...emptyParameters })

const showModal = (index: number) => {
  editIndex.value = index
  Object.assign(currentParameters, parameters[index])
  isModalActive.value = true
}

const closeModal = () => {
  isModalActive.value = false
  editIndex.value = -1
  Object.assign(currentParameters, {...emptyParameters})
}

/* Called when user edits the modal data and clicks save */
const saveEdit = async (updatedParameter: Parameter) => {
  try {
    if (user.value) {
      const token = await user.value.getIdToken(true)

      updatedParameter.createDate = getCurrentTime()

      const response = await authenticatedRequest(
        token,
        `/configs/${updatedParameter.key}`,
        'PUT',
        updatedParameter
      )
      console.log(response)
      parameters.splice(editIndex.value, 1, { ...updatedParameter })
    } else {
      console.error('User is not authenticated')
    }
  } catch (error) {
    console.error('Error fetching parameters: ', error)
  }

  closeModal()
}

/* Asynchronous functions */

/* Fetch parameters from DB when page is mounted */
const fetchParameters = async () => {
  try {
    if (user.value) {
      // <-- null check
      const token = await user.value.getIdToken(true) // <-- getIdToken usage
      const response = await authenticatedRequest(token, '/configs', 'GET')
      parameters.splice(0, parameters.length, ...response) // Reactive assignment
    } else {
      console.error('User is not authenticated')
    }
  } catch (error) {
    console.error('Error fetching parameters: ', error)
  }
}

onMounted(async () => {
  const auth = getAuth()
  // Firebase auth state change listener
  await onAuthStateChanged(auth, (authUser) => {
    // <-- added auth state listener
    if (authUser) {
      user.value = authUser
      fetchParameters()
    } else {
      // Handle user not authenticated
      console.log('User not authenticated')
    }
  })
})

/* Called when user enters valid parameter fields and clicks the add button */
const addParameter = async () => {
  try {
    if (user.value) {
      // <-- null check
      const token = await user.value.getIdToken(true)

      if (newParameter.key && newParameter.value[0].value && newParameter.description) {
        newParameter.createDate = getCurrentTime()
        if (newParameter.value[0].value_tag == '') {
          newParameter.value[0].value_tag = 'default'
        }

        const response = await authenticatedRequest(token, '/configs', 'POST', newParameter)
        parameters.push({ ...newParameter })

        // reset 'newparameter'
        Object.assign(newParameter, {...emptyParameters})
      } else {
        console.error('User is not authenticated')
      }
    }
  } catch (error) {
    console.error('Error fetching parameters: ', error)
  }
}

const deleteParameter = async (index: number) => {
  try {
    if (user.value) {
      const token = await user.value.getIdToken(true)

      const currentKey = parameters[index].key

      if (currentKey) {
        const response = await authenticatedRequest(token, `/configs/${currentKey}`, 'DELETE')
        console.log(response)
        parameters.splice(index, 1)
        // reset 'newparameter'
        Object.assign(newParameter, {...emptyParameters})
      } else {
        console.error('User is not authenticated')
      }
    }
  } catch (error) {
    console.error('Error fetching parameters: ', error)
  }
}
</script>

<template>
  <div class="config-page-container">
    <div class="table-container">
      <div class="table-header">Parameter Key</div>
      <div class="table-header">Value</div>
      <div class="table-header">Description</div>
      <div class="table-header">Create Date</div>
      <div class="table-header">Actions</div>
      <div v-for="(parameter, index) in parameters" :key="index" class="table-row">
        <div class="table-item">{{ parameter.key }}</div>
        <div class="table-item">
          <div class="values" v-for="val in parameter.value" :key="val.value_tag">
            <div class="value-tag">{{ val.value_tag }}</div>
            <div class="value-value">{{ val.value }}</div>
          </div>
        </div>
        <div class="table-item">{{ parameter.description }}</div>
        <div class="table-item">{{ parameter.createDate }}</div>
        <div class="table-item">
          <button @click="showModal(index)" class="edit-btn">Edit</button>
          <CustomModal
            :parameter="currentParameters"
            v-if="isModalActive"
            @close="closeModal"
            @save="saveEdit"
          />
          <button @click="deleteParameter(index)" class="delete-btn">Delete</button>
        </div>
      </div>

      <div class="parameter-key-input">
        <input v-model="newParameter.key" placeholder="New Parameter" />
      </div>
      <div class="parameter-value-input">
        <input v-model="newParameter.value[0].value" placeholder="Value" />
        <input v-model="newParameter.value[0].value_tag" placeholder="Tag" />
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
            <h2><b>Value: </b></h2>
            <div class="values" v-for="val in parameter.value" :key="val.value_tag">
              <div class="value-tag">{{ val.value_tag }}</div>
              <div class="value-value">{{ val.value }}</div>
            </div>
          </div>
          <div class="parameter-group">
            <h2><b>Description: </b> {{ parameter.description }}</h2>
          </div>

          <div class="parameter-group">
            <h2><b>Create Date: </b>{{ parameter.createDate }}</h2>
          </div>
        </div>
        <div class="card-actions">
          <button @click="showModal(index)" class="edit-btn">Edit</button>
          <CustomModal
            :parameter="currentParameters"
            v-if="isModalActive"
            @close="closeModal"
            @save="saveEdit"
          />
          <button @click="deleteParameter(index)" class="delete-btn">Delete</button>
        </div>
      </div>
      <div class="card add-card">
        <input v-model="newParameter.key" placeholder="New Parameter" />
        <input v-model="newParameter.value[0].value" placeholder="Value" />
        <input v-model="newParameter.value[0].value_tag" placeholder="Tag" />
        <input v-model="newParameter.description" placeholder="New Description" />
        <button @click="addParameter" class="add-btn">Add</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  grid-template-rows: 1fr;
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
  width: fit-content;

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

.values {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 5px;
  gap: 2px;
}

.value-value {
  display: inline-flex;
}

.value-tag {
  cursor: pointer;
  font-weight: 400;
  font-size: 10px;
  display: inline-flex;
  padding: 5px;
  border-radius: 5px;
  background: var(--gradient-tag);
  transition: background-color 0.3s;
}

.value-tag:hover {
  cursor: pointer;
  font-weight: 400;
  font-size: 10px;
  display: inline-flex;
  padding: 5px;
  border-radius: 5px;
  background: var(--gradient-delete-button);
}

input {
  padding: 10px;
  border: 1px solid #2d3551;
  border-radius: 8px;

  background-color: transparent;
  color: white;
  font-size: 14px;
}
input:focus {
  border: 1px solid var(--color-border);
  outline: none;
  box-shadow: none;
}

.parameter-key-input {
  width: fit-content;
  grid-column: 1;
}
.parameter-key-input input {
  align-content: start;
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

.parameter-description-input {
  grid-column: 3 / 5;
  width: 90%;
}

.parameter-description-input input {
  width: 100%;
}

.card-container {
  display: none;
}

@media (max-width: 720px) {
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
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
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

  .value-value {
    font-size: 15px;
    font-weight: 300;
  }
  b {
    font-weight: 500;
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
