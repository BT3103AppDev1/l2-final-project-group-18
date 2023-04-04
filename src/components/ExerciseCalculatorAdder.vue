<template>
  <div v-if="showCalculatorAdder" class="exercise-adder">
    <div class="exercise-adder-title">
      <h2>Add exercise type and time you spent doing the exercise:</h2>
    </div>

    <div class="back-button">
      <p><a class="back-link" @click="closeCalculatorAdder">Back</a></p>
    </div>

    <div>
      <label class="label1">Exercise Type:</label>
      <select class="drop-down-list1" v-model="selectedExerciseType">
        <option disabled value="">Select an exercise type</option>
        <option
          v-for="exercise in exerciseTypes"
          :key="exercise.id"
          :value="exercise.id"
        >
          {{ exercise.name }}
        </option>
      </select>
    </div>

    <div>
      <label class="label2">Exercise Time:</label>
      <select class="drop-down-list2" v-model="selectedExerciseTime">
        <option disabled value="">Select exercise time</option>
        <option v-for="time in exerciseTimes" :key="time" :value="time">
          {{ time }}
        </option>
      </select>
    </div>

    <div class="add-button-wrapper">
      <button id="add-button" @click="addExercise">Add</button>
    </div>

    <div v-if="showSuccessMessage" class="modal">
      <div class="success-pop-up">
        <div class="success-message">
          <h3>New Activity Added!</h3>
        </div>
        <div class="okay-button-wrapper">
          <button class="okay-button" @click="closeSuccessMessage">Okay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { eventBus } from '@/eventBus.js'

const db = getFirestore(firebaseApp)

export default {
  name: 'AddExercise',

  data() {
    return {
      user: false,
      exerciseTypes: [],
      selectedExerciseType: '',
      exerciseTimes: Array.from({ length: 48 }, (_, i) => (i + 1) * 5),
      selectedExerciseTime: '',
      showSuccessMessage: false,
    }
  },

  async created() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }
    })
    await this.fetchExerciseTypes()
  },

  props: {
    showCalculatorAdder: {
      type: Boolean,
      required: true,
      // i.e. the parent must provide a value for it
    },
  },

  methods: {
    async fetchExerciseTypes() {
      const exerciseTypesRef = collection(db, 'exerciseCalorie')
      const exerciseTypesSnapshot = await getDocs(exerciseTypesRef)

      this.exerciseTypes = exerciseTypesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }))
    },

    async addExercise() {
      if (!this.selectedExerciseType || !this.selectedExerciseTime) {
        alert('Please select both exercise type and time.')
        return
      }

      const newExercise = {
        type: doc(db, 'exerciseCalorie', this.selectedExerciseType),
        duration: parseInt(this.selectedExerciseTime, 10),
      }

      const userRef = doc(db, 'users', this.user.uid)
      const sportTrackingRef = collection(userRef, 'sportTracking')

      await addDoc(sportTrackingRef, newExercise)
      eventBus.emit('exerciseAdded')
      this.showSuccessMessage = true
      this.selectedExerciseType = ''
      this.selectedExerciseTime = ''
    },

    closeSuccessMessage() {
      this.showSuccessMessage = false
    },

    closeCalculatorAdder() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.exercise-adder {
  position: absolute;
  top: -400px;
  left: -30px;

  width: 500px;
  height: 300px;
  background: #faf4e1;
  border: 5px solid #9f978b;
  border-radius: 20px;

  z-index: 10
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
.exercise-adder-title {
  position: absolute;
  width: 673px;
  height: 61px;
  left: 21px;
  top: 17px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 22px;
  /* or 92% */
  display: flex;
  align-items: center;

  color: #746652;
}

.label1 {
  position: absolute;
  width: 150px;
  height: 41px;
  left: 41px;
  top: 89px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 22px;
  /* or 110% */
  display: flex;
  align-items: center;

  color: #a88151;
}

.drop-down-list1 {
  box-sizing: border-box;

  position: absolute;
  width: 300px;
  height: 35px;
  left: 170px;
  top: 92px;

  background: #ececec;
  border: 1px solid #c1c1c1;
  border-radius: 20px;
}

.label2 {
  position: absolute;
  width: 150px;
  height: 41px;
  left: 41px;
  top: 166px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 22px;
  /* or 110% */
  display: flex;
  align-items: center;

  color: #a88151;
}

.drop-down-list2 {
  box-sizing: border-box;

  position: absolute;
  width: 300px;
  height: 35px;
  left: 170px;
  top: 170px;

  background: #ececec;
  border: 1px solid #c1c1c1;
  border-radius: 20px;
}

.add-button-wrapper {
  position: absolute;
  left: 50px;
  top: 240px;
  width: 500px;
  height: 50px;
}

.add-button-wrapper #add-button {
  width: 400px;
  height: 40px;

  font-family: 'Mulish';
  font-style: normal;
  font-size: 20px;
  text-align: center;
  color: #746652;

  background: #fcb64e;
  border-radius: 30px;
}

.okay-button-wrapper {
  position: absolute;
  left: 20px;
  top: 150px;
  width: 200px;
  height: 50px;
}
.okay-button {
  width: 260px;
  height: 37px;

  font-family: 'Mulish';
  font-style: normal;
  font-size: 19px;
  text-align: center;
  color: #746652;

  background: #fcb64e;
  border-radius: 30px;
}

.success-message {
  position: absolute;
  width: 300px;
  height: 76px;
  left: 37px;
  top: 50px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 22px;
  /* or 73% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #746652;
}

.success-pop-up {
  position: absolute;
  top: 50px;
  left: 70px;

  width: 300px;
  height: 200px;
  background: #faf4e1;
  border: 5px solid #9f978b;
  border-radius: 20px;
}
</style>
