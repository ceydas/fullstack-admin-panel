import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { db, auth, getUserData } from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAdmin: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      meta: {
        requiresAdmin: false
      },

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SigninView.vue')
    }
  ]
})
const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser()

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (currentUser) {
      const idTokenResult = await currentUser.getIdTokenResult()
      if (idTokenResult.claims.admin) {
        next()
      } else {
        next('/signin')
      }
    } else {
      next('/signin')
    }
  } else {
    next()
  }
})

export default router
