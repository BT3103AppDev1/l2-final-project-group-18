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
import profile from "../views/ProfileView.vue";
import infoCard from "../views/infoCard.vue";
import infoPage1 from "../views/infoPage1.vue";
import infoPage2 from "../views/infoPage2.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: profile,
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
      path: "/goals",
      name: "Goals Page",
      component: GoalsPage,
    },
    {
      path: "/",
      name: "login",
      component: login,
    },
    {
      path: "/signup",
      name: "signup",
      component: signup,
    },
    {
      path: "/signout",
      name: "signout",
      component: signout,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: welcome,
    },
    {
      path: "/updateProfile",
      name: "updateProfile",
      component: updateProfile,
    },
    {
      path: '/infoCard',
      name: 'infoCard',
      component: infoCard,
    },
    {
      path: '/infoPage1',
      name: 'infoPage1',
      component: infoPage1,
    },
    {
      path: '/infoPage2',
      name: 'infoPage2',
      component: infoPage2,
    },
  ],
});

export default router;
