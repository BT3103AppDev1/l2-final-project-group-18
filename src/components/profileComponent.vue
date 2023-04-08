<template>
  <div class="title">
    <p>{{ greeting }}</p>
  </div>

  <div class="container">
    <div id="weight-height-card">
      <div class="icon-title-container1">
        <img src="@/assets/heart.svg" alt="heart" class="icon" />
        <h2>Weight & Height</h2>
      </div>
      <div id="weight">{{ weight }} kg</div>
      <div id="height">{{ height }} cm</div>
    </div>

    <div id="exercise-card">
      <div class="icon-title-container2">
        <img src="@/assets/exercise_card.svg" alt="heart" class="icon" />
        <h2>Exercise</h2>
      </div>
      <div id="exerciseStats">{{ exerciseStats }} min</div>
    </div>

    <div id="BMI-card">
      <div class="icon-title-container3">
        <img src="@/assets/bmi.svg" alt="heart" class="icon" />
        <h2>BMI</h2>
        <div id="health" v-if="isBMIHealthy">[healthy]</div>
        <div id="health" v-else>[unhealthy]</div>
      </div>
      <div id="bmi">{{ bmi }}</div>
    </div>

    <div id="calories-card">
      <div class="icon-title-container4">
        <img src="@/assets/calories.svg" alt="heart" class="icon" />
        <h2>Calories</h2>
      </div>
      <div id="calorieStats">{{ calorieStats }} /day</div>
    </div>
  </div>

  <div class="button">
    <button id="btn" @click="updateProfile">Update Profile Info</button>
  </div>
  <img class="image" src="../assets/profile_page.png" alt="image here" />
</template>

<script>
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'profile',

  data() {
    return {
      username: null,
      uid: null,
      weight: null,
      height: null,
      bmi: null,
      exerciseStats: null,
      calorieStats: null,
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const profileDocRef = doc(db, 'users', user.uid)
        getDoc(profileDocRef).then((profileDoc) => {
          if (profileDoc.exists()) {
            const profileData = profileDoc.data()
            if (profileData.profile_info) {
              this.username = profileData.profile_info.username
              this.uid = user.uid
              const healthStats = profileData.healthStats || {}
              this.weight = healthStats.weight || null
              this.height = healthStats.height || null
              this.calculateBMI()

              const weeklyExerciseDocRef = doc(
                db,
                'users',
                this.uid,
                'goalInfo',
                'weeklyExercise'
              )
              getDoc(weeklyExerciseDocRef).then((weeklyExerciseDoc) => {
                if (weeklyExerciseDoc.exists()) {
                  const weeklyExerciseData = weeklyExerciseDoc.data()
                  this.exerciseStats = weeklyExerciseData.targetMin || null
                }
              })

              const dailyCalorieDocRef = doc(
                db,
                'users',
                this.uid,
                'goalInfo',
                'dailyCalorie'
              )
              getDoc(dailyCalorieDocRef).then((dailyCalorieDoc) => {
                if (dailyCalorieDoc.exists()) {
                  const dailyCalorieData = dailyCalorieDoc.data()
                  this.calorieStats = dailyCalorieData.targetCalorie || null
                }
              })
            }
          }
        })
      }
    })
  },

  computed: {
    greeting() {
      if (this.username) {
        return `Hello, ${this.username}!`
      } else {
        return 'Loading...'
      }
    },

    isBMIHealthy() {
      if (this.bmi >= 18.5 && this.bmi <= 24.9) {
        return true
      } else {
        return false
      }
    },
  },

  methods: {
    calculateBMI() {
      if (this.weight && this.height) {
        const heightInMeters = this.height / 100
        const bmi = this.weight / (heightInMeters * heightInMeters)
        this.bmi = bmi.toFixed(1)
      } else {
        this.bmi = null
      }
    },

    updateProfile() {
      this.$router.push('/updateProfile')
    },
  },
}
</script>

<style scoped>
.container #bmi {
  position: absolute;
  width: 103.03px;
  height: 98.22px;
  left: 100px;
  top: 60px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 91px;

  color: #0db1ad;

  transform: rotate(0.34deg);
}

.icon-title-container3 #health {
  width: 84px;
  height: 26px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;

  color: #0db1ad;

  transform: rotate(0.34deg);

  position: absolute;
  top: 20px;
  left: 130px;
}

.icon-title-container1 {
  display: flex;
  vertical-align: middle;
  margin-left: 20px;
}

.icon-title-container2 {
  display: flex;
  vertical-align: middle;
  margin-left: 25px;
}

.icon-title-container3 {
  display: flex;
  vertical-align: middle;
  margin-left: 25px;
}

.icon-title-container4 {
  display: flex;
  vertical-align: middle;
  margin-left: 25px;
}

.container #exerciseStats {
  position: absolute;
  width: 150px;
  height: 98.22px;
  left: 100px;
  top: 60px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 91px;

  color: #7042c9;

  transform: rotate(0.34deg);
}

.container #calorieStats {
  position: absolute;
  width: 150px;
  height: 98.22px;
  left: 100px;
  top: 60px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 91px;

  color: #197bd2;

  transform: rotate(0.34deg);
}

.title {
  position: absolute;
  width: 953.85px;
  height: 100px;
  left: 300px;

  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 30px;

  color: #061428;

  transform: rotate(0.07deg);
}

.container {
  position: absolute;
  display: flex;
  left: 90px;
  /* top: -5px; */
}

.container #weight {
  position: absolute;
  width: 150px;
  height: 98.22px;
  left: 100px;
  top: 60px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 91px;

  color: #d2416e;

  transform: rotate(0.34deg);
}

.container #height {
  position: absolute;
  width: 150px;
  height: 98.22px;
  left: 100px;
  top: 100px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 91px;

  color: #d2416e;

  transform: rotate(0.34deg);
}

.button {
  position: absolute;
  width: 400px;
  height: 80px;
  left: 1200px;
  top: 200px;
}

.button #btn {
  box-sizing: border-box;

  position: absolute;
  width: 220px;
  height: 60px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  text-align: center;

  color: #000000;
  background: #ddd8ba;
  border: 1.5px solid #000000;
  /* box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25); */
  border-radius: 31.5px;
  box-sizing: border-box;
  transform: matrix(1, 0, 0, 1, 0, 0);
}

.button #btn:hover {
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.container #exercise-card {
  position: absolute;
  width: 317.2px;
  height: 262px;
  left: 587.55px;
  top: 165.12px;

  background: #ece7f5;
  border-radius: 40px;
  transform: rotate(0.34deg);
}

.container #weight-height-card {
  position: absolute;
  width: 317.2px;
  height: 259.03px;
  left: 232px;
  top: 163.12px;

  background: #f3dde4;
  border-radius: 40px;
  transform: rotate(0.34deg);
}

.container #BMI-card {
  position: absolute;
  width: 317.2px;
  height: 262px;
  left: 227.55px;
  top: 453.12px;

  background: #dceded;

  border-radius: 40px;
  transform: rotate(0.34deg);
}

.container #calories-card {
  position: absolute;
  width: 317.2px;
  height: 262px;
  left: 585.55px;
  top: 451.12px;

  background: rgba(25, 123, 210, 0.1);
  border-radius: 40px;
  transform: rotate(0.34deg);
}

.image {
  display: block;
  position: absolute;
  top: 300px;
  left: 1100px;
}

.icon {
  margin: 0 10px;
}
</style>
