<template>
  <div class="title">
    <h1>Info Card</h1>
  </div>

  <div class="container">
    <div class="infoCard">
      <h1>Info Card 1</h1>
      <p>Weight Loss Tips</p>
      <button @click="goToLink1">Explore</button>
      <button @click="showPopup1">More Info</button>

      <PopupBox v-if="showingPopup1" :text="popupText1" @close="closePopup1" />
      
    </div>

    <div class="infoCard">
      <h1>Info Card 2</h1>
      <h2>Exercise Tips</h2>
      <button @click="goToLink2">Explore</button>
    </div>

    <div class="infoCard">
      <h1>Info Card 3</h1>
      <p>Healthy Recipes</p>
      <button @click="goToLink3">Explore</button>
    </div>

    <div class="infoCard">
      <h1>Info Card 4</h1>
      <p>Motivation Quotes</p>
      <button @click="goToLink4">Explore</button>
    </div>
  </div>
</template>

<script>
import PopupBox from "@/components/PopupBox.vue";

export default {
  name: "infoCard",
  components: {
    PopupBox,
  },
  data() {
    return {
      showingPopup1: false,
      popupText1: "insert paragraph here",
      // Define other popup text and flags for other info cards
    };
  },
  methods: {
    showPopup1() {
      this.showingPopup1 = true;
    },
    closePopup1() {
      this.showingPopup1 = false;
    },
    goToLink1() {
      window.location.href =
        "https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/12-tips-to-help-you-lose-weight/";
    },
    goToLink2() {
      window.location.href = "https://www.healthline.com/nutrition/best-exercise-for-weight-loss";
    },
    goToLink3() {
      window.location.href =
        "https://www.bbcgoodfood.com/recipes/collection/healthy";
    },
    goToLink4() {
      window.location.href =
        "https://www.success.com/17-motivational-quotes-to-help-you-achieve-your-dreams/";
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
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
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
}


.infoCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 45%;
  background-color: lightblue;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
