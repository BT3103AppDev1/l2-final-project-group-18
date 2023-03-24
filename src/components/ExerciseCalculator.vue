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
        <p id="sport">{{ exercise.name }}</p>
        <p id="duration">{{ exercise.time }} min</p>
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

const db = getFirestore(firebaseApp)

export default {
  name: 'Exercise-Calculator',

  components: {
    ExerciseCalculatorAdder,
  },

  data() {
    return {
      totalCalories: 1000,
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
    eventBus.off('exerciseAdded', this.fetchExercises)
  },

  methods: {
    closeCalculator() {
      this.$emit('close')
    },

    async fetchWeeklyExercises() {
      const userRef = doc(db, 'users', 'yVcS7HsSsZiQIPoZfNuM')
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
          time: exercise.duration,
        })
      }
      this.weeklyExercises = newExercises
    },
  },
}
</script>

<style scoped>
.exercise-calculator {
  position: absolute;
  top: -100px;
  left: 160px;

  width: 800px;
  height: 670px;
  background: #faf4e1;
  border: 5px solid #9f978b;
  border-radius: 20px;
}
.exercise-container {
  position: absolute;
  display: flex;
  flex-wrap: wrap; /* This will allow the items to wrap to the next row */
  gap: 1rem;
  top: 120px;
  left: 50px; /* Adjust the gap between the blocks as needed */
}
.back-button {
  position: absolute;
  top: 10px;
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
  left: 45px;
  top: 46px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 22px;
  /* or 88% */
  display: flex;
  align-items: center;

  color: #746652;
}

.exercise-block {
  width: 250px;
  height: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd8ba;
  border-radius: 20px;
}

.exercise-block #sport {
  width: 140px;
  font-family: 'Lato';
  font-style: normal;
  font-size: 28px;
  color: #a08666;
}

.exercise-block #duration {
  width: 87px;
  font-family: 'Lato';
  font-style: normal;
  font-size: 28px;
  color: #a08666;
}

.add-button-wrapper {
  position: absolute;
  left: 126px;
  top: 530px;
  width: 700px;
  height: 50px;
}

.add-button-wrapper #add-button {
  width: 550px;
  height: 50px;

  font-family: 'Mulish';
  font-style: normal;
  font-size: 20px;
  text-align: center;
  color: #746652;

  background: #fcb64e;
  border-radius: 30px;
}

.calories-summary-text {
  position: absolute;
  width: 642px;
  height: 44px;
  left: 130px;
  top: 600px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 22px;
  /* or 73% */
  display: flex;
  align-items: center;

  color: #a88151;
}
</style>
