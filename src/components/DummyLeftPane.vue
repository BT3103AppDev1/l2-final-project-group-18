<template>
  <div class="left-pane">
    <div class="app-name">
      <h2>HealthBuddy</h2>
    </div>
    <ul>
      <li>
        <img src="@/assets/dashboard.svg" alt="dashboard" class="icon" />
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li>
        <img src="@/assets/food.svg" alt="food" class="icon" />
        <router-link to="/food">Food</router-link>
      </li>
      <li>
        <img src="@/assets/exercise.svg" alt="exercise" class="icon" />
        <router-link to="/exercise">Exercise</router-link>
      </li>
      <li>
        <img src="@/assets/profile.svg" alt="profile" class="icon" />
        <router-link to="/profile">Profile</router-link>
      </li>
      <!-- <li>
                <router-link to="/login">login</router-link>
            </li> -->
      <!-- <li>
                <router-link to="/welcome">welcome</router-link>
            </li> -->
      <!-- <li>
                <router-link to="/updateProfile">update profile</router-link>
            </li> -->
      <li>
        <img src="@/assets/leaderboard.svg" alt="leaderboard" class="icon" />
        Leaderboard
      </li>
      <li>
        <img src="@/assets/infocard.svg" alt="infocard" class="icon" />
        <router-link to="/infoCard">infoCard</router-link>
      </li>
      <li>
        <img src="@/assets/goal.svg" alt="goal" class="icon" />
        <router-link to="/goals">Goals</router-link>
      </li>
      <li>
        <img src="@/assets/signout.svg" alt="signout" class="icon" />
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
  background-color: #fdf0e677;
  overflow-y: auto;
  padding: 20px 0;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-name {
  width: 100%;
  position: absolute;
  top: 10px;
}

h2 {
  color: #182508;
  font-family: monospace;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 25px;
}

ul {
  list-style-type: none; /* Remove bullet points from list items */
  padding: 0; /* Remove default padding from list */
  width: 100%;
  position: absolute;
  top: 70px;
}

li {
  padding: 12px 16px;
  margin-bottom: 5px;
  border-radius: 5px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

li a {
  text-decoration: none; /* Remove the underline */
  color: #262424;
}

li a:hover {
  color: #42b581; /* Set the color when the link is hovered */
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 30px;
  margin-left: 25px;
}

router-link,
router-link:visited,
router-link:active {
  text-decoration: none;
  color: #ffffff;
}

router-link:focus {
  outline: none;
}

router-link:hover {
  text-decoration: none;
  color: #bdc3c7;
}
</style>
