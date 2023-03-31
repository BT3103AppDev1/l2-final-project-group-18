<template>
    <div class = "left-pane">
        <h2>HealthBuddy</h2>
        <ul>
            <li>
                <router-link to="/dashboard">Dashboard</router-link>
            </li>
            <li>
                <router-link to="/food">Food</router-link>
            </li>
            <li>
                <router-link to="/exercise">Exercise</router-link>
            </li>
            <li>
                <router-link to="/login">login</router-link>
            </li>
            <li>
                <router-link to="/welcome">welcome</router-link>
            </li>
            <li>
                <router-link to="/updateProfile">update profile</router-link>
            </li>
            <li>Leaderboard</li>
            <li>Info cards</li>
            <li><router-link to = "/goals">Goals</router-link></li>
            <li>
                <router-link to="/signout">Sign out</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'LeftPane',
  style: 'width: 100%',
  components: {
    RouterLink,
  },
}
</script>

<style scoped>
.left-pane {
  width: 18%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #f1f1f1;
  overflow-y: auto;
}

ul {
  list-style-type: none; /* Remove bullet points from list items */
  padding: 0; /* Remove default padding from list */
}

li {
  padding: 10px; /* Add padding to list items */
}
</style>
