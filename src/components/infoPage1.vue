<template>
  <div class="title">
    <h1>Quick Eating Tips </h1>
    <div class="text">
      <p>Here are some quick tips for staying healthy and losing weight: Avoid skipping breakfast, eat regular meals, eat plenty of fruits and veg, drink plenty of water, eat high fibre foods, use a smaller plate, don't stock on junk food, and finally, avoid alochol.</p>
    </div>
  </div>

  <img class = "image" src="../assets/infocard1.png" alt="image here">

  <div class="button">
    <button id="btn" @click="infoCard">Back to Info Card</button>
  </div>
  
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: "infoPage1",
  components: {
    RouterLink,
  },
  methods: {
    infoCard() {
      this.$router.push('/infoCard')
    },
    
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  width: 953.85px;
  height: 200px; /* increase the height to accommodate the text */
  left: 300px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: #061428;
  transform: rotate(0.07deg);
}

.text {
  position: absolute;
  top: 100px;
  right: 550px;
}

.image {
  display: block;
  width: 40vw;
  height: auto;
  position: absolute;
  top: 100px;
  right: 50px;
}

.button {
  position: absolute;
  width: 400px;
  height: 80px;
  bottom: 20px;
  left: 300px;
}
.button #btn {
  box-sizing: border-box;

  position: absolute;
  width: 220px;
  height: 60px;

  font-family: 'Mulish', sans-serif;
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
</style>