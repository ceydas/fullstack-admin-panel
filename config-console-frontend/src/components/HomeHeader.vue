<script setup lang="ts">
import { ref, onMounted } from 'vue'
import logo from '../assets/codeway-logo.png'
import signOutIcon from '../assets/sign-out.svg'
import { getAuth, signOut, onAuthStateChanged, type Auth } from 'firebase/auth'
import { useRouter } from 'vue-router'

const isLoggedIn = ref(false)
const router = useRouter()

let auth: Auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/signin')
  })
}

</script>

<template>
  <header class="header">
    <img :src="logo" alt="codeway logo" class="logo" />
    <div class="sign-out-container">
      <img class="sign-out" @click="handleSignOut" :src="signOutIcon" alt="sign out icon" />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  height: 2vw;
  min-height: 30px;
}

.sign-out-container {
  position: relative;
  display: flex;
  align-items: center;
}

.sign-out {
  height: 1.7vw;
  min-height: 24px;
}

.sign-out:hover {
  cursor: pointer;
}
</style>
