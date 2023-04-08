<template>
  <div class="current-goal-wrapper">
    <h1 id="title">Current Goals</h1>

    <div class="first" v-if="hasWeightData">
      <cardUpdateGoal
        goalTitleU="Update weight gain / weight loss goal"
      ></cardUpdateGoal>
    </div>
    <div class="first" v-else>
      <cardSetGoal goalTitle="Set weight gain/ weight loss goal"></cardSetGoal>
    </div>

    <div class="second" v-if="hasExerciseData">
      <cardUpdateExerciseGoal
        goalTitleUE="Update weekly exercise goal"
      ></cardUpdateExerciseGoal>
    </div>
    <div class="second" v-else>
      <cardSetExerciseGoal
        goalTitleE="Set weekly exercise goal"
      ></cardSetExerciseGoal>
    </div>

    <div class="third" v-if="hasCalorieData">
      <cardUpdateCalorieGoal
        goalTitleUC="Update daily calorie intake goal"
      ></cardUpdateCalorieGoal>
    </div>
    <div class="third" v-else>
      <cardSetCalorieGoal
        goalTitleC="Set daily calorie intake goal"
      ></cardSetCalorieGoal>
    </div>
  </div>
</template>

<script>
import cardSetGoal from '../components/cardSetGoal.vue'
import cardSetExerciseGoal from './cardSetExerciseGoal.vue'
import cardSetCalorieGoal from './cardSetCalorieGoal.vue'
import cardUpdateCalorieGoal from './cardUpdateCalorieGoal.vue'
import cardUpdateExerciseGoal from './cardUpdateExerciseGoal.vue'
import cardUpdateGoal from './cardUpdateGoal.vue'

import firebaseApp from '../firebase.js'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
  name: 'SetGoalComponent',
  components: {
    cardSetGoal,
    cardSetExerciseGoal,
    cardSetCalorieGoal,
    cardUpdateCalorieGoal,
    cardUpdateExerciseGoal,
    cardUpdateGoal,
  },
  data() {
    return {
      targetMin: null,
      targetCalorie: null,
      daysToCompleteGoal: null,
      weightChangeInKg: null,
      weightGainOrLoss: null,
      userID: '',
    }
  },
  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userID = user.uid
        this.getWeightData()
        this.getExerciseData()
        this.getCalorieData()
      }
    })
  },
  methods: {
    async getExerciseData() {
      const userRef = doc(db, 'users', this.userID)
      const goalInfoCollection = collection(userRef, 'goalInfo')
      const goalInfoSnapshot = await getDoc(
        doc(goalInfoCollection, 'weeklyExercise')
      )

      if (goalInfoSnapshot.exists()) {
        this.targetMin = goalInfoSnapshot.data().targetMin
      }
    },
    async getCalorieData() {
      const userRef = doc(db, 'users', this.userID)
      const goalInfoCollection = collection(userRef, 'goalInfo')
      const goalInfoSnapshot = await getDoc(
        doc(goalInfoCollection, 'dailyCalorie')
      )

      if (goalInfoSnapshot.exists()) {
        this.targetCalorie = goalInfoSnapshot.data().targetCalorie
      }
    },
    async getWeightData() {
      const userRef = doc(db, 'users', this.userID)
      const goalInfoCollection = collection(userRef, 'goalInfo')
      const goalInfoSnapshot = await getDoc(
        doc(goalInfoCollection, 'weightGoals')
      )

      if (goalInfoSnapshot.exists()) {
        this.daysToCompleteGoal = goalInfoSnapshot.data().daysToCompleteGoal
        this.weightChangeInKg = goalInfoSnapshot.data().weightChangeInKg
        this.weightGainOrLoss = goalInfoSnapshot.data().weightGainOrLoss
      }
    },
  },
  computed: {
    hasExerciseData() {
      return this.targetMin !== null && this.targetMin !== 0
    },
    hasCalorieData() {
      return this.targetCalorie !== null && this.targetCalorie !== 0
    },
    hasWeightData() {
      return this.weightChangeInKg !== null && this.weightChangeInKg !== 0
    },
  },
}
</script>

<style scoped>
/* weight gain/loss */

.current-goal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  /* right:0 -> the element should be positioned at the right edge of its parent element */
  width: 82%;
  height: 18%;
  /* background-color: #FBF5F4; */
}

h1 {
  position: absolute;
  left: 40px;
  top: 10px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 25px;
}

.second {
  position: absolute;
  top: 150px;
}

.third {
  position: absolute;
  top: 300px;
}
</style>
