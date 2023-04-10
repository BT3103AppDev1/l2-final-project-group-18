<template>
  <div class="topbar-wrapper">
    <div class="topbar-achieve-text">
      <h4>
        Current Daily Calorie Intake: {{ totalDailyCaloriesIntake }} calories
      </h4>
    </div>

    <!-- Use a wrapper class to put one rectangle on top of another -->
    <div class="progressbar-wrapper">
      <div class="goal"></div>
      <div class="progress" :style="{ width: progressWidth }"></div>
    </div>

    <div class="topbar-goal-text">
      <h4>Daily Calorie Target: {{ dailyCaloriesTarget }} calories</h4>
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
  name: 'TopBar-Food',

  data() {
    return {
      user: false,
      dailyCaloriesTarget: 0,
    }
  },

  computed: {
    ...mapState(['totalDailyCaloriesIntake']),
    progressWidth() {
      const goalWidth = 940
      const progressPercentage =
        (this.totalDailyCaloriesIntake / this.dailyCaloriesTarget) * 100
      const progressWidth =
        (Math.min(progressPercentage, 100) / 100) * goalWidth
      return progressWidth + 'px'
    },
  },

  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user
        await this.fetchDailyCaloriesTarget()
      }
    })
  },

  methods: {
    async fetchDailyCaloriesTarget() {
      const dailyCaloriesTargetRef = doc(
        db,
        'users',
        this.user.uid,
        'goalInfo',
        'dailyCalorie'
      )
      const dailyCaloriesTargetSnapshot = await getDoc(dailyCaloriesTargetRef)
      this.dailyCaloriesTarget =
        dailyCaloriesTargetSnapshot.data().targetCalorie
    },
  },
}
</script>

<style scoped>
.topbar-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 251px;
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
  top: 90px;
  right: 130px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.4px;

  color: #c5c7cd;
}
</style>
