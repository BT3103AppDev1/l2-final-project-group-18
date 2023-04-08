<template>
  <div v-if="showPopUp6" class="updateGoal">
    <div class="topRow">
      <div id="right-elem">
        <button @click="closePopUp6" class="close-icon">x</button>
      </div>
    </div>

    <div id="title">
      <h1>Update Goal</h1>
    </div>

    <div class="allRows">
      <div class="secondRow">
        <div class="left-text">
          <label>Weight gain / Weight loss:</label>
        </div>
        <div class="right-input">
          <select class="drop-down-list" v-model="weightGainOrLoss">
            <option value="" disabled selected>Update weight goal</option>
            <option value="Weight Gain">Weight Gain</option>
            <option value="Weight Loss">Weight Loss</option>
          </select>
        </div>
      </div>

      <div class="thirdRow">
        <div class="left-text2">
          <label>Amount of kg to gain / lose:</label>
        </div>
        <div class="middle-input">
          <input
            type="number"
            v-model="weightChangeInKg"
            placeholder="0"
            min="0"
          />
        </div>
        <div class="right-text">
          <p>kg</p>
        </div>
      </div>

      <div class="thirdRow">
        <div class="left-text2">
          <label>Days to achieve the goal:</label>
        </div>
        <div class="middle-input3">
          <input
            type="number"
            v-model="daysToCompleteGoal"
            placeholder="0"
            min="0"
          />
        </div>
        <div class="right-text">
          <p>days</p>
        </div>
      </div>
    </div>
    <button id="updateGoalButton" @click="updateGoalClick">UPDATE</button>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js'
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
  name: 'UpdateGoalPopUp',
  props: {
    showPopUp6: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      weightGainOrLoss: '',
      weightChangeInKg: 0,
      daysToCompleteGoal: 0,
      userID: '',
    }
  },

  created() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userID = user.uid
      }
    })
  },

  methods: {
    closePopUp6() {
      this.$emit('close')
    },

    async updateGoalClick() {
      if (
        !this.weightGainOrLoss ||
        !this.weightChangeInKg ||
        !this.daysToCompleteGoal
      ) {
        alert(
          'Please fill in all 3 weight goal information you want to update to and check the data you are keying in is of the correct type.'
        )
        return
      }

      const userRef = doc(db, 'users', this.userID)
      const goalInfoCollection = collection(userRef, 'goalInfo')
      const goalInfoDoc = doc(goalInfoCollection, 'weightGoals')

      const docRef = await updateDoc(goalInfoDoc, {
        daysToCompleteGoal: this.daysToCompleteGoal,
        weightChangeInKg: this.weightChangeInKg,
        weightGainOrLoss: this.weightGainOrLoss,
        goalSetAt: serverTimestamp(),
      })

      // update the weight data of the user for goal tracking purpose
      const userSnapshot = await getDoc(userRef)
      const healthStats = userSnapshot.data().healthStats
      const prevWeight = healthStats.weight
      await updateDoc(userRef, {
        'healthStats.weightForGoal': prevWeight,
      })

      this.closePopUp6()
      location.reload()
    },
  },
}
</script>

<style scoped>
.updateGoal {
  position: fixed;
  width: 700px;
  height: 500px;
  background-color: #faf4e1;
  border: 5px solid #9f978b;
  border-radius: 20px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: #faf4e1;
  border: 0px;
}

.close-icon:hover {
  color: #9f978b;
}

.topRow {
  width: 100%;
  display: flex;
}

#title {
  color: #000;
  font-weight: 700;
  font-size: 30px;
  line-height: 22px;
  flex: 0.5; /* or 46% */
  text-align: center;
  font-family: 'Mulish', sans-serif;
}

#right-elem {
  padding-top: 11px;
  color: #746652;
}

.allRows {
  width: 100%;
  font-family: 'Mulish', sans-serif;
  padding-top: 10px;
}

.secondRow {
  width: 100%;
  display: flex;
  font-family: 'Mulish', sans-serif;
  padding-top: 10px;
}

.left-text {
  padding-left: 8%;
  font-weight: 50;
  font-size: 20px;
  padding-top: 5px;
}

.drop-down-list {
  position: relative;
  box-sizing: border-box;
  flex: 0.67;
  width: 209px;
  height: 40px;
  margin-left: 37px;
  padding-left: 20%;
  padding-top: 15%;
  background: #ddd8ba;
  color: #746652;
  border: 1px solid #c1c1c1;
  border-radius: 20px;
  font-weight: 50;
  font-size: 20px;
  font-family: 'Mulish', sans-serif;
}

.thirdRow {
  width: 100%;
  display: flex;
  font-family: 'Mulish', sans-serif;
  padding-top: 10px;
  align-items: center;
}

.left-text2 {
  padding-left: 8%;
  font-weight: 50;
  font-size: 20px;
  padding-top: 5px;
}

.middle-input {
  margin-left: 25px;
}

input {
  border: 1px solid #c1c1c1;
  background: #ddd8ba;
  border-radius: 5px;
  font-weight: 50;
  font-size: 20px;
  font-family: 'Mulish', sans-serif;
  height: 40px;
  width: 200px;
  box-shadow: 2px 2px 4px #c1c1c1;
}

.right-text {
  margin-left: 20px;
  font-weight: 50;
  font-size: 20px;
}

.middle-input3 {
  margin-left: 42px;
}

#updateGoalButton {
  background-color: #fcb64e;
  width: 200px;
  height: 50px;
  border-radius: 8px;
  font-size: 20px;
  margin-top: 50px;
}
</style>
