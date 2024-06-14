<script>
import TheWelcome from '../components/TheWelcome.vue'
import SigninButton from '../components/SigninButton.vue'

export default {
  components: {
    TheWelcome,
    SigninButton
  }
}
</script>

<template>
  <main>
    <TheWelcome />
    <SigninButton msg="Sign in" />
  </main>
</template>
