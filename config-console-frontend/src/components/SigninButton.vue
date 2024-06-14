<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <button class="sign-in-button">{{ msg }}</button>
</template>

<style scoped>
.sign-in-button {
  background: linear-gradient(#5f78ee, #485cc1);
  color: white;
  border: none;
  align-self: center;
  padding: 15px 20px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 30vmax;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.sign-in-button:hover {
  transform: scale(1.03);
  cursor: pointer;
}
.sign-in-button:active {
  transform: scale(1.03);
  cursor: pointer;
}
</style>
