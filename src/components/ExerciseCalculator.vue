<template>
  <div v-if="showCalculator" class="exercise-calculator">
    <!-- This item only rendered if showChecker = true -->

    <div class="back-button">
      <p><a class="back-link" @click="closeCalculator">Back</a></p>
    </div>

    <div class="exercise-summary-text">
      <p>Current Weekly Activities</p>
    </div>

    <div class="exercise-container">
      <div
        v-for="exercise in weeklyExercises"
        :key="exercise.id"
        class="exercise-block"
      >
        <div class="text-wrapper">
          <p id="sport">{{ exercise.name }}</p>
          <p id="duration">{{ exercise.duration }} min</p>
        </div>
      </div>
    </div>

    <div class="add-button-wrapper">
      <button id="add-button" @click="($event) => (showCalculatorAdder = true)">
        Add New Activity
      </button>

      <ExerciseCalculatorAdder
        :showCalculatorAdder="showCalculatorAdder"
        @close="($event) => (showCalculatorAdder = false)"
      />
    </div>

    <div class="calories-summary-text">
      <p>Current total calories burnt: {{ totalCalories }} calories</p>
    </div>
  </div>
</template>

<script>
import ExerciseCalculatorAdder from './ExerciseCalculatorAdder.vue'
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
} from 'firebase/firestore'
import firebaseApp from '../firebase.js'
import { eventBus } from '@/eventBus.js'
import { mapActions, mapState } from 'vuex'

const db = getFirestore(firebaseApp)

export default {
  name: 'Exercise-Calculator',

  components: {
    ExerciseCalculatorAdder,
  },

  data() {
    return {
      totalCalories: 0,
      showCalculatorAdder: false,
      weeklyExercises: [],
    }
  },

  props: {
    showCalculator: {
      type: Boolean,
      required: true,
      // i.e. the parent must provide a value for it
    },
  },

  async created() {
    // Listen for the 'exerciseAdded' event and call the 'fetchExercises' method
    eventBus.on('exerciseAdded', this.fetchWeeklyExercises)
    await this.fetchWeeklyExercises()
  },

  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    eventBus.off('exerciseAdded', this.fetchWeeklyExercises)
  },

  methods: {
    closeCalculator() {
      this.$emit('close')
    },

    async fetchWeeklyExercises() {
      const userRef = doc(db, 'users', 'UZwy1hqjve1VIUsgIrhy')
      const sportTrackingRef = collection(userRef, 'sportTracking')
      const exercisesSnapshot = await getDocs(sportTrackingRef)
      const exercises = exercisesSnapshot.docs.map((doc) => doc.data())

      const newExercises = []

      for (const exercise of exercises) {
        const exerciseTypeRef = exercise.type
        const exerciseTypeSnapshot = await getDoc(exerciseTypeRef)
        newExercises.push({
          id: exerciseTypeSnapshot.id,
          name: exerciseTypeSnapshot.data().name,
          duration: exercise.duration,
        })
      }
      this.weeklyExercises = newExercises
      await this.calculateTotalCalories()
      await this.calculateTotalWeeklyExerciseTime()
    },

    async calculateTotalCalories() {
      let totalCaloriesBurnt = 0

      for (const exercise of this.weeklyExercises) {
        const exerciseTypeRef = doc(db, 'exerciseCalorie', exercise.id)
        const exerciseTypeSnapshot = await getDoc(exerciseTypeRef)
        const caloriesBurntPerMinute =
          exerciseTypeSnapshot.data().caloriesBurntPerMinute
        totalCaloriesBurnt += exercise.duration * caloriesBurntPerMinute
      }

      this.totalCalories = totalCaloriesBurnt.toFixed(2)
    },

    async calculateTotalWeeklyExerciseTime() {
      let totalWeeklyExerciseTime = 0

      for (const exercise of this.weeklyExercises) {
        totalWeeklyExerciseTime += exercise.duration
      }

      this.updateTotalWeeklyExerciseTime(totalWeeklyExerciseTime)
    },

    ...mapActions(['updateTotalWeeklyExerciseTime']),
  },
}
</script>

<style scoped>
.exercise-calculator {
  position: absolute;
  top: -100px;
  left: -100px;

  width: 600px;
  height: 500px;
  background: #faf4e1;
  border: 5px solid #9f978b;
  border-radius: 20px;
}

.back-button {
  position: absolute;
  top: -10px;
  right: 10px;

  font-family: 'Mulish';
  font-style: normal;
  font-size: 15px;
  color: #746652;
}

.back-link:hover {
  color: brown;
  cursor: pointer;
  text-decoration: underline;
}

.exercise-summary-text {
  position: absolute;
  width: 673px;
  height: 43px;
  left: 28px;
  top: 32px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  line-height: 22px;
  /* or 88% */
  display: flex;
  align-items: center;

  color: #746652;
}

.exercise-container {
  position: absolute;
  display: flex;
  flex-wrap: wrap; /* This will allow the items to wrap to the next row */
  gap: 1rem;
  top: 90px;
  width: 550px;
  left: 28px; /* Adjust the gap between the blocks as needed */
}

.exercise-block {
  width: 170px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd8ba;
  border-radius: 20px;
}

.text-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-wrapper #sport {
  width: 89px;
  padding-left: 35px;
  font-family: 'Lato';
  font-style: normal;
  font-size: 19px;
  color: #a08666;
}

.exercise-block #duration {
  width: 87px;
  font-family: 'Lato';
  font-style: normal;
  font-size: 19px;
  color: #a08666;
}

.add-button-wrapper {
  position: absolute;
  left: 75px;
  top: 400px;
  width: 500px;
  height: 40px;
}

.add-button-wrapper #add-button {
  width: 450px;
  height: 40px;

  font-family: 'Mulish';
  font-style: normal;
  font-size: 17px;
  text-align: center;
  color: #746652;

  background: #fcb64e;
  border-radius: 30px;
}

.calories-summary-text {
  position: absolute;
  width: 642px;
  height: 44px;
  left: 94px;
  top: 445px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 22px;
  /* or 73% */
  display: flex;
  align-items: center;

  color: #a88151;
}
</style>
