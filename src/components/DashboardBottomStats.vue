<template>
  <div class="statistics-wrapper">
    <div class="statistic-block">
      <h3>Current Calories Burnt</h3>
      <p>{{ totalWeeklyCaloriesBurntInt }}</p>
    </div>
    <div class="statistic-block">
      <h3>Current Exercise Time</h3>
      <p>{{ totalWeeklyExerciseTime }}</p>
    </div>
    <div class="statistic-block">
      <h3>Current Calories Intake</h3>
      <p>{{ totalDailyCaloriesIntakeInt }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import firebaseApp from '../firebase.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
  name: 'StatisticsOverview',

  computed: {
    ...mapState([
      'totalWeeklyExerciseTime',
      'totalWeeklyCaloriesBurnt',
      'totalDailyCaloriesIntake',
    ]),
    totalWeeklyCaloriesBurntInt() {
      return Math.round(this.totalWeeklyCaloriesBurnt)
    },
    totalDailyCaloriesIntakeInt() {
      return Math.round(this.totalDailyCaloriesIntake)
    },
  },
}
</script>

<style scoped>
.statistics-wrapper {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  position: absolute;
  top: 580px;
  left: 400px;
}

.statistic-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 27%;
  height: 100px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
  margin: 10 10px;

  background: #fcf4df;
  border: 1px solid #dde2ff;
  border-radius: 8px;
}

.statistic-block h3 {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.4px;
  color: #9fa2b4;
  margin: 0 10px;
}

.statistic-block p {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 1px;
  color: #0db1ad;
  margin: 0 10px;
}
</style>
