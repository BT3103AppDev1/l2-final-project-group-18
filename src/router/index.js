
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FoodMain from "../views/FoodMain.vue";
import ExerciseMain from "../views/ExerciseMain.vue";
import login from "../views/login.vue";
import signup from "../views/signup.vue";
import signout from "../views/signout.vue";
import welcome from "../views/WelcomePage.vue";
import updateProfile from "../views/UpdateProfilePage.vue";
import GoalsPage from "../views/GoalsPage.vue";
import DashboardView from "../views/DashboardView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/food",
      name: "food",
      component: FoodMain,
    },
    {
      path: "/exercise",
      name: "exercise",
      component: ExerciseMain,
    },
    {
      path: '/goals',
      name: 'Goals Page',
      component: GoalsPage,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
    },
    {
      path: '/signout',
      name: 'signout',
      component: signout,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: welcome,
    },
    {
      path: '/updateProfile',
      name: 'updateProfile',
      component: updateProfile,
    },
  ],
})

export default router
