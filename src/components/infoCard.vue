<template>
  <div class="title">
    <h1>Top picks for you! </h1>
    <p>food, exercise, and more!</p>
  </div>

  <div class="container">
    <div class="infoCard">
      <img src="../assets/infocard1.png" @click="infoPage1" alt="Info card image" class="clickable-image">
      <h2>Quick Tips for Healthy Eating and Losing Weight</h2>
    </div>

    <div class="infoCard">
      <img src="@/assets/infocard2.png" @click="infoPage2" alt="Info card image" class="clickable-image">
      <h2>Good Daily Exercise Habits Worth Learning</h2>
    </div>

  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: "infoCard",
  components: {
    RouterLink,
  },
  methods: {
    infoPage1() {
      this.$router.push('/infoPage1')
    },
    infoPage2() {
      this.$router.push('/infoPage2')
    },
    
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  width: 953.85px;
  height: 100px;
  left: 300px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  color: #061428;
  transform: rotate(0.07deg);
}

.container {
  position: absolute;
  width: 800px;
  top: 150px;
  height: 600px;
  left: 300px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 50px; /* Add some space between the title and the containers */
}

.infoCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensure the elements are spaced evenly */
  align-items: center;
  width: 75%;
  height: 50%;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid black;

  /* Add these rules to position the image and text */
  text-align: center;
  overflow: hidden; /* Ensure the image stays within the container */
}

.infoCard img {
  max-width: 110%; /* Ensure the image fits within the container */
  margin-bottom: 20px; /* Add some space between the image and text */
}

.clickable-image {
  cursor: pointer;
}
</style>
