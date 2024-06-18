import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getAuth } from 'firebase/auth'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const init = initializeApp(firebaseConfig)
const db = getFirestore(init)
const auth = getAuth(init)

const getUserData = async (uid: String) => {
  const userDoc = await getDoc(doc(db, 'users', uid))
  return userDoc.exists() ? userDoc.data() : null
}

console.log(init)
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

export { db, auth }
