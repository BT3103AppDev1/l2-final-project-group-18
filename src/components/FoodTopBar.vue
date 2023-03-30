<template>
  <div class="topbar-wrapper">
    <div class="topbar-achieve-text">
      <h4>Current Daily Calorie Intake: 1080 calories</h4>
    </div>

    <!-- Use a wrapper class to put one rectangle on top of another -->
    <div class="progressbar-wrapper">
      <div class="goal"></div>
      <div class="progress"></div>
    </div>

    <div class="topbar-goal-text">
      <h4>Daily Calorie Target: 1600 calories</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar-Food',
}
</script>

<style scoped>
.topbar-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  /* right:0 -> the element should be positioned at the right edge of its parent element */
  width: 82%;
  height: 18%;
  /* background-color: #FBF5F4; */
}

.topbar-achieve-text {
  position: absolute;
  left: 20px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
}

.progressbar-wrapper {
  position: relative;
}

.progress {
  position: absolute;
  top: 65px;
  left: 20px;
  width: 650px;
  height: 32px;
  background-color: #869f77;
  border-radius: 21px;
}

/* The gray part */
.goal {
  position: absolute;
  top: 65px;
  left: 20px;
  width: 980px;
  height: 32px;
  background-color: #e8e8e8;
  border-radius: 21px;
}

.topbar-goal-text {
  position: absolute;
  top: 90px;
  right: 130px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 0.4px;

  color: #c5c7cd;
}
</style>
