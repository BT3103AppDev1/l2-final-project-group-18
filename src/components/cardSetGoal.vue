<template>
  <div class="card">
    <div class="section">
      <div id="left-elem">
        <p>{{ goalTitle }}</p>
      </div>
      <div id="right-elem">
        <button @click="($event) => (showPopUp1 = true)" id="button">
          SET
        </button>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <div id="circle"></div>
      <div id="no-goals-elem">
        <p>No goals currently</p>
      </div>
    </div>
    <div v-if="showPopUp1" class="overlay">
      <SetGoalPopUp
        :showPopUp1="showPopUp1"
        @close="($event) => (showPopUp1 = false)"
      />
    </div>
  </div>
</template>

<script>
import SetGoalPopUp from './setGoalPopUp.vue'

export default {
  name: 'cardSetGoal',
  components: {
    SetGoalPopUp,
  },
  data() {
    return {
      showPopUp1: false,
    }
  },
  props: {
    goalTitle: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
/* cards / default */

.card {
  position: absolute;
  left: 40px;
  top: 110px;
  width: 800px;
  height: 116px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #dfe0eb;
}

.section {
  display: flex;
  font-family: 'Mulish', sans-serif;
  padding-left: 20px;
  padding-bottom: 5px;
  padding-top: 5px;
}

#left-elem {
  color: #c5c7cd;
  flex: 0.95;
}

#right-elem {
  padding-top: 11px;
  color: #746652;
}

#button {
  background-color: #fcb64e;
  width: 54px;
  height: 24px;
  border-radius: 8px;
}

/* sheet */

.divider {
  border: 1px solid #dfe0eb;
  border-radius: 8px;
}

#circle {
  border-radius: 50%;
  border: 2px solid #dfe0eb;
  background-color: transparent;
  width: 15px;
  height: 15px;
  margin-top: 13px;
  margin-right: 20px;
}

#no-goals-elem {
  color: #252733;
}

.overlay {
  position: fixed;
  top: 20%;
  left: 30%;
  z-index: 9999;
  text-align: center;
  width: 700px;
  height: 300px;
}
</style>
