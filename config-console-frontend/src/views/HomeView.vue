<template>
  <main>
    <TheWelcome />
    <SigninButton msg="Hello" />
  </main>
</template>

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
