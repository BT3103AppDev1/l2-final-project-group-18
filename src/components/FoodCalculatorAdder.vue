<template>
  <div v-if="showCalculatorAdder" class="food-adder">
    <div class="food-adder-title">
      <h2>Enter food type and total servings you had:</h2>
    </div>

    <div class="back-button">
      <p><a class="back-link" @click="closeCalculatorAdder">Back</a></p>
    </div>

    <div>
      <label class="label1">Food Type:</label>
      <select class="drop-down-list1" v-model="selectedFoodType">
        <option disabled value="">Select a food type</option>
        <option v-for="food in foodTypes" :key="food.id" :value="food.id">
          {{ food.name }}
        </option>
      </select>
    </div>

    <div>
      <label class="label2">Serving:</label>
      <select class="drop-down-list2" v-model="selectedNumOfServings">
        <option disabled value="">Select number of servings</option>
        <option v-for="serving in servingNum" :key="serving" :value="serving">
          {{ serving }}
        </option>
      </select>
    </div>

    <div class="add-button-wrapper">
      <button id="add-button" @click="addFood">Add</button>
    </div>

    <div v-if="showSuccessMessage" class="modal">
      <div class="success-pop-up">
        <div class="success-message">
          <h3>New Food Added!</h3>
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
  name: 'AddFood',

  data() {
    return {
      user: false,
      foodTypes: [],
      selectedFoodType: '',
      servingNum: Array.from({ length: 20 }, (_, i) => i + 1),
      selectedNumOfServings: '',
      showSuccessMessage: false,
    }
  },

  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }
    })
    this.fetchFoodTypes()
  },

  props: {
    showCalculatorAdder: {
      type: Boolean,
      required: true,
      // i.e. the parent must provide a value for it
    },
  },

  methods: {
    async fetchFoodTypes() {
      const foodTypesRef = collection(db, 'foodCalorie')
      const foodTypesSnapshot = await getDocs(foodTypesRef)

      this.foodTypes = foodTypesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }))
    },

    async addFood() {
      if (!this.selectedFoodType || !this.selectedNumOfServings) {
        alert('Please select both food type and number of servings.')
        return
      }

      const newFood = {
        type: doc(db, 'foodCalorie', this.selectedFoodType),
        servings: parseInt(this.selectedNumOfServings, 10),
      }

      const userRef = doc(db, 'users', this.user.id)
      const foodTrackingRef = collection(userRef, 'foodTracking')

      await addDoc(foodTrackingRef, newFood)
      eventBus.emit('foodAdded')
      this.showSuccessMessage = true
      this.selectedFoodType = ''
      this.selectedNumOfServings = ''
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
.food-adder {
  position: absolute;
  top: -400px;
  left: -30px;

  width: 500px;
  height: 300px;
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
.food-adder-title {
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
