import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExerciseMain from '../views/ExerciseMain.vue'

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
    }

  ]
})

export default router
