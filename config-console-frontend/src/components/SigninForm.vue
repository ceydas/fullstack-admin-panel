<script setup lang="ts">
import SigninButton from '../components/SigninButton.vue'
</script>

<template>
  <h1>Please sign in</h1>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="inputs-container">
        <div class="input-group">
          <input
            type="email"
            v-model="email"
            placeholder="E-mail address"
            class="input-field email"
          />
        </div>
        <div class="input-group">
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="input-field password"
          />
        </div>
      </div>
      <SigninButton msg="Sign in" />
    </form>
  </div>
</template>

<style scoped>
.prompt {
  font-size: 20px;
  font-weight: 200;
  color: ;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
}

.inputs-container {
  margin-bottom: 3vh;
}

.input-group {
  border: none;
  outline: none;
}

.input-field {
  padding: 20px 20px;
  width: 30vmax;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: transparent; /* Input background color */
  outline: none;
  transition: border 0.3s;
  font-size: 20px;
  border: 1px solid #2d3551;
}
.input-field.email {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.input-field:focus {
  border: 1px solid #d96ad6;
}

@media (max-width: 900px) {
  .input-field {
    width: 40vmax;
  }
}
</style>
