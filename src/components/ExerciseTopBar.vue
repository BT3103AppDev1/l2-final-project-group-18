<template>
  <div class="topbar-wrapper">
    <div class="topbar-achieve-text">
      <h4>
        Current weekly exercise time: {{ totalWeeklyExerciseTime }} minutes
      </h4>
    </div>

    <!-- Use a wrapper class to put one rectangle on top of another -->
    <div class="progressbar-wrapper">
      <div class="goal"></div>
      <div class="progress" :style="{ width: progressWidth }"></div>
    </div>

    <div class="topbar-goal-text">
      <h4>Weekly Exercise Target: {{ weeklyExerciseTimeTarget }} minutes</h4>
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
  name: 'TopBar-Exercise',

  data() {
    return {
      user: false,
      weeklyExerciseTimeTarget: 0,
      userID: '',
    }
  },

  computed: {
    ...mapState(['totalWeeklyExerciseTime']),
    progressWidth() {
      const goalWidth = 940
      const progressPercentage =
        (this.totalWeeklyExerciseTime / this.weeklyExerciseTimeTarget) * 100
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
        await this.fetchWeeklyExerciseTimeTarget()
      }
    })
  },

  methods: {
    async fetchWeeklyExerciseTimeTarget() {
      const weeklyExerciseTimeTargetRef = doc(
        db,
        'users',
        this.user.uid,
        'goalInfo',
        'weeklyExercise'
      )
      const weeklyExerciseTimeTargetSnapshot = await getDoc(
        weeklyExerciseTimeTargetRef
      )
      this.weeklyExerciseTimeTarget =
        weeklyExerciseTimeTargetSnapshot.data().targetMin
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
  font-family: 'Mulish';
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
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 0.4px;

  color: #c5c7cd;
}
</style>
