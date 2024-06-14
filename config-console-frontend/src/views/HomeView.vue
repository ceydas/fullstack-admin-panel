<script setup lang="ts">
import SigninForm from '../components/SigninForm.vue'
import logo from '@/assets/codeway-logo.png'
</script>

<template>
  <main class="main-container">
    <div class="sign-in-page-container">
      <img :src="logo" alt="codeway logo" />
      <SigninForm />
      <div class="form-container"></div>
    </div>
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-in-page-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
}

/* Optional: Style for img to ensure it doesn't overflow */
.sign-in-page-container img {
  margin-top: 10vh;
  max-width: 100%;
  max-height: 100%;
  height: 20vmin;
  min-height: 100px;
  margin-bottom: 5vh;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
