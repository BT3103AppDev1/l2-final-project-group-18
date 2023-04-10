<template>
  <div class="topbar-wrapper">
    <div class="topbar-achieve-text">
      <h4 v-if="weightGainOrLoss === 'Weight Gain'">
        {{ daysLeftToAchieveGoal }} Days left to achieve Weight Gain goal
      </h4>
      <h4 v-if="weightGainOrLoss === 'Weight Loss'">
        {{ daysLeftToAchieveGoal }} Days left to achieve Weight Loss goal
      </h4>
    </div>

    <!-- Use a wrapper class to put one rectangle on top of another -->
    <div class="progressbar-wrapper">
      <div class="goal"></div>
      <div class="progress" :style="{ width: progressWidth }"></div>
    </div>

    <div class="topbar-goal-text">
      <p v-if="weightGainOrLoss === 'Weight Gain'">
        Target Weight Gain {{ weightChangeGoal }} kg
      </p>
      <p v-if="weightGainOrLoss === 'Weight Loss'">
        Target Weight Loss {{ weightChangeGoal }} kg
      </p>
    </div>

    <div class="topbar-curr-change-text" :style="{ left: progressWidth }">
      <p v-if="weightGainOrLoss === 'Weight Gain'">
        Current Weight Gain {{ currWeightChange }} kg
      </p>
      <p v-if="weightGainOrLoss === 'Weight Loss'">
        Current Weight Loss {{ currWeightChange }} kg
      </p>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import firebaseApp from '../firebase.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
  name: 'TopBar-Exercise',

  data() {
    return {
      user: false,
      goalStartDate: null,
      daysToAchieveGoal: 0,
      weightGainOrLoss: '',
      weightChangeGoal: 0,
      currWeight: 0,
      currWeightChange: 0,
      weightForGoal: 0,
    }
  },

  computed: {
    progressWidth() {
      const goalWidth = 940
      let currWeightChange = 0
      if (this.weightGainOrLoss == 'Weight Gain') {
        currWeightChange = Math.max(0, this.currWeight - this.weightForGoal)
      } else {
        currWeightChange = Math.max(0, this.weightForGoal - this.currWeight)
      }
      this.currWeightChange = currWeightChange

      const progressPercentage =
        (currWeightChange / this.weightChangeGoal) * 100
      const progressWidth =
        (Math.min(progressPercentage, 100) / 100) * goalWidth
      return progressWidth + 'px'
    },

    daysLeftToAchieveGoal() {
      if (!this.goalStartDate || !this.daysToAchieveGoal) {
        return '-'
      }

      const currentDate = new Date()
      const timeDifference = currentDate - this.goalStartDate
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

      return Math.max(0, this.daysToAchieveGoal - daysDifference)
    },
  },

  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user
        await this.fetchGoalInfo()
        await this.fetchWeightStats()
      }
    })
  },

  methods: {
    async fetchGoalInfo() {
      const weightGoalRef = doc(
        db,
        'users',
        this.user.uid,
        'goalInfo',
        'weightGoals'
      )
      const weightGoalSnapshot = await getDoc(weightGoalRef)

      this.goalStartDate = weightGoalSnapshot.data().goalSetAt.toDate()
      this.daysToAchieveGoal = weightGoalSnapshot.data().daysToCompleteGoal
      this.weightChangeGoal = weightGoalSnapshot.data().weightChangeInKg
      this.weightGainOrLoss = weightGoalSnapshot.data().weightGainOrLoss
    },

    async fetchWeightStats() {
      const userRef = doc(db, 'users', this.user.uid)
      const userSnapshot = await getDoc(userRef)
      const currWeight = userSnapshot.data().healthStats.weight
      const weightForGoal = userSnapshot.data().healthStats.weightForGoal
      this.currWeight = currWeight
      this.weightForGoal = weightForGoal
    },
  },
}
</script>

<style scoped>
.topbar-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  /* right:0 -> the element should be positioned at the right edge of its parent element */
  width: 82%;
  height: 18%;
  /* background-color: #FBF5F4; */
}

.topbar-achieve-text {
  position: absolute;
  left: 80px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
}

.progressbar-wrapper {
  position: relative;
}

.progress {
  position: absolute;
  top: 65px;
  left: 80px;
  height: 32px;
  background-color: #869f77;
  border-radius: 21px;
}

/* The gray part */
.goal {
  position: absolute;
  top: 65px;
  left: 80px;
  width: 940px;
  height: 32px;
  background-color: #e8e8e8;
  border-radius: 21px;
}

.topbar-goal-text {
  position: absolute;
  top: 22px;
  right: 130px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 0.4px;

  color: #c5c7cd;
}

.topbar-curr-change-text {
  position: absolute;
  top: 90px;
  right: 130px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 0.4px;

  color: #c5c7cd;
}
</style>
