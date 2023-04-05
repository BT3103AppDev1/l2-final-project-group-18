<template>
  <div class="food-tool-wrapper">
    <div class="food-tool-title">
      <h4>Food Intake Utility Tools</h4>
    </div>

    <div class="calorie-checker-title">
      <h4>
        <a class="popup-link" @click="showFoodChecker = true">
          Calorie Checker
        </a>
        <FoodChecker
          :showFoodChecker="showFoodChecker"
          @close="showFoodChecker = false"
          class="food-checker-overlay"
        />
      </h4>
    </div>

    <div class="calorie-checker-wrapper">
      <div class = "calorie-checker-image">
        <img src = "../../public/Salad.png">
      </div>
      <div class="calorie-checker-intro">
        <p>Check the calorie content of each serving of food!</p>
      </div>
    </div>

    <div class="calorie-calculator-title">
      <h4>
        <a class="popup-link" @click="($event) => (showCalculator = true)"
          >Calorie Calculator
        </a>
        <FoodCalculator
          :showCalculator="showCalculator"
          @close="($event) => (showCalculator = false)"
          class="food-calculator-overlay"
        />
      </h4>
    </div>

    <div class="calorie-calculator-wrapper">
      <div class = "calorie-calculator-image">
        <img src = "../../public/Burger.png">
      </div>
      <div class="calorie-calculator-intro">
        <p>Calculate your current daily calorie intake!</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  writeBatch
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import FoodChecker from './FoodChecker.vue'
import FoodCalculator from './FoodCalculator.vue'

export default {
  name: 'Food-Tools',
  components: {
    FoodChecker,
    FoodCalculator,
  },
  data() {
    return {
      showFoodChecker: false,
      showCalculator: false,
    }
  },
  mounted() {
    const currentUser = getAuth().currentUser;
        console.log("Get current user");

        const calorieStatsRef = 
            collection(doc(getFirestore(), "users", currentUser.uid), "calorieStats");
        console.log("Get collection");

        getDocs(calorieStatsRef).then((snapshot) => {
            if (snapshot.size > 0) {
                console.log("calorieStats already exists");
            } else {
                console.log("calorieStats collection does not exist");

                const batch = writeBatch(getFirestore());
                const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                daysOfWeek.forEach((day) => {
                    const docRef = doc(calorieStatsRef, day);
                    batch.set(docRef, { calorie: 0 });
                });

                batch.commit().then(() => {
                    console.log("calorieStats collection and documents created successfully");
                }).catch((error) => {
                    console.log("Error creating calorieStats collection and documents:", error);
                });

                for (const day of daysOfWeek) {
                    this.calorieStats[day] = 0;
                }
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
  }
}
</script>

<style scoped>
.food-checker-overlay {
  position: absolute;
  z-index: 9999;
}

.food-calculator-overlay {
  position: absolute;
  z-index: 9999; /* Set the z-index value to a high number */
}

.food-tool-wrapper {
  position: absolute;
  top: 100px;
  left: 320px;
}

.food-tool-title {
  position: absolute;
  top: 0px;
  left: 10px;

  width: 400px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;

  color: #588061;
}

.popup-link:hover {
  color: brown;
  cursor: pointer;
  text-decoration: underline;
}

.calorie-checker-wrapper {
  position: absolute;
  width: 300px;
  height: 200px;
  left: 10px;
  top: 80px;

  background: #fdf6e9;
  border: 1px solid #dde2ff;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.calorie-checker-title {
  position: absolute;
  top: 60px;
  left: 30px;
  width: 300px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  line-height: 31px;

  z-index: 10; /* Make the title display on top of the background */

  color: #9a6f56;
}

.calorie-checker-image {
  position: absolute;
  width: 100px;
  height: 80px;
  top: 20px;
  left: 15px;
}

.calorie-checker-intro {
  position: absolute;
  width: 100px;
  height: 80px;
  top: 80px;
  left: 150px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.4px;

  color: #7d7d7d;
}

.calorie-calculator-wrapper {
  position: absolute;
  width: 300px;
  height: 200px;
  top: 80px;
  left: 330px;

  background: #fdf6e9;
  border: 1px solid #dde2ff;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.calorie-calculator-title {
  position: absolute;
  top: 60px;
  left: 350px;
  width: 300px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  line-height: 31px;

  z-index: 9; /* Make the title display on top of the background */

  color: #9a6f56;
}

.calorie-calculator-image {
  position: absolute;
  width: 100px;
  height: 80px;
  top: 70px;
  left: 40px;
}

.calorie-calculator-intro {
  position: absolute;
  width: 100px;
  height: 80px;
  top: 80px;
  left: 150px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.4px;

  color: #7d7d7d;
}
</style>
