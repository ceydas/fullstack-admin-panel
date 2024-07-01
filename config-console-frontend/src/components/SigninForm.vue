<script setup lang="ts">
import SigninButton from '../components/SigninButton.vue'
import '../assets/base.css'

import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errMsg = ref('')
const router = useRouter()

const signin = async (): Promise<void> => {
  const auth = getAuth()
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)

    const user = userCredential.user
    console.log(user)

    // Get ID token
    const idTokenResult = await user.getIdTokenResult()
    const claims = idTokenResult.claims
    if (claims.admin) {
      console.log('User is an admin')
      router.push('/')
    } else {
      errMsg.value = 'Unauthorized access.'
    }
  } catch (error: any) {
    console.log(error.code)
    switch (error.code) {
      case 'auth/invalid-email':
        errMsg.value = 'Invalid email'
        break
      case 'auth/user-not-found':
        errMsg.value = 'User not found'
        break
      case 'auth/wrong-password':
        errMsg.value = 'Incorrect password'
        break
      default:
        errMsg.value = 'Email or password was incorrect'
        break
    }
  }
}
</script>

<template>
  <h1>Please sign in</h1>
  <div class="form-container">
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
    <SigninButton @click="signin" msg="Sign in" />
    <p class="err-message" v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<style scoped>
.prompt {
  font-size: 20px;
  font-weight: 200;
  color: white;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  color: beige;
  font-weight: 300;
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
.err-message {
  color: var(--co);
}
</style>
