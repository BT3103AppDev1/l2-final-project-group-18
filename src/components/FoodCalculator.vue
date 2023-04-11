<template>
  <div v-if="showCalculator" class="food-calculator">
    <div class="back-button">
      <p><a class="back-link" @click="closeCalculator">Back</a></p>
    </div>

    <div class="food-summary-text">
      <p>Current Food Intake:</p>
    </div>

    <div class="food-container">
      <div v-for="food in dailyFood" :key="food.id" class="food-block">
        <div class="text-wrapper">
          <p id="food">{{ food.name }}</p>
          <p id="servings">x {{ food.servings }}</p>
        </div>
        <button
          @click="(event) => handleDelete(food.userFoodId)"
          class="delete-icon"
        >
          &times;
        </button>
      </div>
    </div>

    <div class="add-button-wrapper">
      <button id="add-button" @click="($event) => (showCalculatorAdder = true)">
        Add New Food
      </button>

      <FoodCalculatorAdder
        :showCalculatorAdder="showCalculatorAdder"
        @close="($event) => (showCalculatorAdder = false)"
      />
    </div>

    <div class="calories-summary-text">
      <p>
        Current total calories intake: {{ totalDailyCaloriesIntake }} calories
      </p>
    </div>
  </div>
</template>

<script>
import FoodCalculatorAdder from './FoodCalculatorAdder.vue'
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import firebaseApp from '../firebase.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { eventBus } from '@/eventBus.js'
import { mapActions, mapState } from 'vuex'

const db = getFirestore(firebaseApp)

export default {
  name: 'Food-Calculator',

  components: {
    FoodCalculatorAdder,
  },

  data() {
    return {
      user: false,
      showCalculatorAdder: false,
      dailyFood: [],
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    }
  },

  computed: {
    ...mapState(['totalDailyCaloriesIntake']),
  },

  props: {
    showCalculator: {
      type: Boolean,
      required: true,
      // i.e. the parent must provide a value for it
    },
  },

  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user
        await this.fetchDailyFood()
        // Listen for the 'foodAdded' event and call the 'fetchFood' method
        eventBus.on('foodAdded', this.fetchDailyFood)
      }
    })
  },

  beforeDestroy() {
    if (!this.user) {
      // Remove the event listener when the component is destroyed
      eventBus.off('foodAdded', this.fetchDailyFood)
    }
  },

  methods: {
    closeCalculator() {
      this.$emit('close')
    },

    async handleDelete(foodId) {
      const userRef = doc(db, 'users', this.user.uid)
      const foodTrackingRef = collection(userRef, 'foodTracking')
      const foodRef = doc(foodTrackingRef, foodId)

      // Delete the document from Firestore
      await deleteDoc(foodRef)
      await this.fetchDailyFood()
    },

    async fetchDailyFood() {
      const userRef = doc(db, 'users', this.user.uid)
      const foodTrackingRef = collection(userRef, 'foodTracking')
      const foodSnapshot = await getDocs(foodTrackingRef)
      const foodTypes = foodSnapshot.docs.map((doc) => {
        return { id: doc.id, data: doc.data() }
      })

      const newFood = []

      for (const food of foodTypes) {
        const foodTypeRef = food.data.type
        const foodTypeSnapshot = await getDoc(foodTypeRef)
        newFood.push({
          id: foodTypeSnapshot.id,
          name: foodTypeSnapshot.data().name,
          servings: food.data.servings,
          userFoodId: food.id,
        })
      }
      this.dailyFood = newFood
      await this.calculateTotalCaloriesIntake()
    },

    async calculateTotalCaloriesIntake() {
      let totalCaloriesIntake = 0

      for (const food of this.dailyFood) {
        const foodTypeRef = doc(db, 'foodCalorie', food.id)
        const foodTypeSnapshot = await getDoc(foodTypeRef)
        const caloriesIntakePer100g =
          foodTypeSnapshot.data().caloriesIntakePer100g
        totalCaloriesIntake += food.servings * caloriesIntakePer100g
      }

      this.updateTotalDailyCaloriesIntake(totalCaloriesIntake.toFixed(2))

      // update the daily calories stats collection
      const today = new Date()

      const currentDayName = this.dayNames[today.getDay()]

      const userRef = doc(db, 'users', this.user.uid)
      const dailyCalorieStatsDocRef = doc(
        userRef,
        'calorieStats',
        currentDayName
      )
      await setDoc(dailyCalorieStatsDocRef, {
        calorie: totalCaloriesIntake,
      })
    },

    ...mapActions(['updateTotalDailyCaloriesIntake']),
  },
}
</script>

<style scoped>
.food-calculator {
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

  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-size: 15px;
  color: #746652;
}

.back-link:hover {
  color: brown;
  cursor: pointer;
  text-decoration: underline;
}

.food-summary-text {
  position: absolute;
  width: 673px;
  height: 43px;
  left: 28px;
  top: 32px;

  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  line-height: 22px;
  /* or 88% */
  display: flex;
  align-items: center;

  color: #746652;
}

.food-container {
  position: absolute;
  display: flex;
  flex-wrap: wrap; /* This will allow the items to wrap to the next row */
  gap: 1rem;
  top: 90px;
  width: 550px;
  left: 28px; /* Adjust the gap between the blocks as needed */
}

.food-block {
  position: relative;
  width: 170px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd8ba;
  border-radius: 10px;
}

.delete-icon {
  position: absolute;
  top: 12px;
  right: 10px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: #a08666;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  font-size: 18px;
  line-height: 1;
}

.delete-icon:hover {
  color: brown;
  cursor: pointer;
}

.text-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-wrapper #food {
  width: 89px;
  padding-left: 35px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-size: 19px;
  color: #a08666;
}

.food-block #servings {
  width: 87px;
  font-family: 'Mulish', sans-serif;
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

  font-family: 'Mulish', sans-serif;
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
  left: 85px;
  top: 445px;

  font-family: 'Mulish', sans-serif;
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
