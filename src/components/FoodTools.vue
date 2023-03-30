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
      <div class="calorie-checker-intro">
        <p>Check the calorie content of each serving of food!</p>
      </div>
    </div>

    <div class="calorie-calculator-title">
      <h4>Calorie Calculator</h4>
    </div>
    <div class="calorie-calculator-wrapper">
      <div class="calorie-calculator-intro">
        <p>Calculate your current weekly calories burnt!</p>
      </div>
    </div>
  </div>
</template>

<script>
import FoodChecker from './FoodChecker.vue'

export default {
  name: 'Food-Tools',
  components: {
    FoodChecker,
  },
  data() {
    return {
      showFoodChecker: false,
    }
  },
}
</script>

<style scoped>
.food-checker-overlay {
  position: absolute;
  z-index: 9999;
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
