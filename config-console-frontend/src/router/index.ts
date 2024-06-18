import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {db, auth} from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      meta: {
        requiresAuth: false
      },

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SigninView.vue')
    }
  ]
})

const getCurrentUser = () => {
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



router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (currentUser) {
      if (to.matched.some((record) => record.meta.requiresAdmin)) {
        const userData = await getUserData(currentUser.uid)
        if (userData?.isAdmin) {
          next()
        } else {
          next('/signin')
        }
      } else {
        next()
      }
    } else {
      next('/signin')
    }
  } else {
    next()
  }
})

export default router
