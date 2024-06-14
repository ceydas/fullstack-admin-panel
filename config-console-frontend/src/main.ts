import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBSLE4YPcX9V54JyOrXl6WAsSOPBa8G0YI',
  authDomain: 'codeway-fullstack-case-b9901.firebaseapp.com',
  projectId: 'codeway-fullstack-case-b9901',
  storageBucket: 'codeway-fullstack-case-b9901.appspot.com',
  messagingSenderId: '672307773664',
  appId: '1:672307773664:web:24d329511a22e9feb11085'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
