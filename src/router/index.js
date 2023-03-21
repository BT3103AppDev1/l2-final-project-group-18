import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExerciseMain from '../views/ExerciseMain.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import signout from '../views/signout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/exercise',
      name: "exercise",
      component: ExerciseMain
    },
    {
      path: '/login',
      name: "login",
      component: login
    },
    {
      path: '/signup',
      name: "signup",
      component: signup
    },
    {
      path: '/signout',
      name: "signout",
      component: signout
    }

  ]
})

export default router
