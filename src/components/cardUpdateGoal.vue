<template>
  <div class="cardUpdate">
    <div class="section">
      <div id="left-elem">
        <p>{{ goalTitleU }}</p>
      </div>
      <div id="right-elem">
        <button @click="($event) => (showPopUp6 = true)" id="updateButton">
          UPDATE
        </button>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <div id="circle"></div>
      <div id="no-goals-elem">
        <p v-if="weightGainOrLoss === 'Weight Gain'">
          I want to gain {{ weightChangeInKg }} kg in
          {{ daysToCompleteGoal }} days
        </p>
        <p v-if="weightGainOrLoss === 'Weight Loss'">
          I want to lose {{ weightChangeInKg }} kg in
          {{ daysToCompleteGoal }} days
        </p>
      </div>
      <div id="seeProgress">
        <router-link to="/dashboard">
          <button id="seeProgressButton">SEE PROGRESS</button>
        </router-link>
      </div>
    </div>

    <div v-if="showPopUp6" class="overlay">
      <UpdateGoalPopUp
        :showPopUp6="showPopUp6"
        @close="($event) => (showPopUp6 = false)"
      />
    </div>
  </div>
</template>

<script>
import UpdateGoalPopUp from './updateGoalPopUp.vue'
import firebaseApp from '../firebase.js'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { mapActions } from 'vuex'

const db = getFirestore(firebaseApp)

export default {
  name: 'cardUpdateGoal',
  components: {
    UpdateGoalPopUp,
  },
  data() {
    return {
      showPopUp6: false,
      daysToCompleteGoal: 0,
      weightChangeInKg: 0,
      weightGainOrLoss: '',
      userID: '',
    }
  },
  props: {
    goalTitleU: {
      type: String,
      required: true,
    },
  },
  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userID = user.uid
        this.fetchWeightGoal()
      }
    })
  },
  methods: {
    async fetchWeightGoal() {
      const userRef = doc(db, 'users', this.userID)
      const goalInfoCollection = collection(userRef, 'goalInfo')
      const goalInfoSnapshot = await getDoc(
        doc(goalInfoCollection, 'weightGoals')
      )
      this.daysToCompleteGoal = goalInfoSnapshot.data().daysToCompleteGoal
      this.weightChangeInKg = goalInfoSnapshot.data().weightChangeInKg
      this.weightGainOrLoss = goalInfoSnapshot.data().weightGainOrLoss
    },
    ...mapActions(['updatePreviousWeight']),
  },
}
</script>

<style>
/* cards / default */
.cardUpdate {
  position: absolute;
  left: 40px;
  top: 110px;
  width: 900px;
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
#updateButton {
  background-color: #fcb64e;
  width: 80px;
  height: 24px;
  border-radius: 8px;
  border: 0;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
}

#updateButton:active {
  color: #fff;
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
  width: 50%;
}

#seeProgress {
  padding-top: 11px;
  width: 50%;
  padding-right: 40px;
}

#seeProgressButton {
  background-color: #869f77;
  width: 140px;
  height: 24px;
  border-radius: 8px;
  float: right;
  border: 0;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
}

#seeProgressButton:active {
  color: #fff;
}

.overlay {
  position: fixed;
  top: 13%;
  left: 30%;
  z-index: 9999;
  text-align: center;
  width: 700px;
  height: 300px;
}
</style>
