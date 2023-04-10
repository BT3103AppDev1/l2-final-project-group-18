<template>
  <div class="chart-wrapper">
    <div class="second-chart-wrapper">
      <p id="header">Exercise <b>calorie</b> breakdown by category</p>
      <p id="no_data" v-if="this.chartData.labels.length == 0">No data.</p>
      <div class="circle" v-if="this.chartData.labels.length == 0"></div>
      <Doughnut
        v-if="loaded"
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import firebaseApp from '../firebase.js'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  getFirestore,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { isProxy, toRaw } from 'vue'
// import { reactive } from "vue";

const db = getFirestore(firebaseApp)

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: {
    Doughnut,
  },
  data() {
    return {
      exerciseDict: {},
      userID: '',
      loaded: false,
      chartData: {
        labels: [], //[ 'Cycling', 'February', 'March', 'April', 'May', 'June' ],
        datasets: [
          {
            data: [], //[40, 20, 12, 25, 50, 60],
            backgroundColor: [
              '#CC8B86',
              '#32CFCB',
              '#588061',
              '#DDD8BA',
              '#FCB64E',
              '#AB8DE5',
              '#FBDC8E',
              '#D2416E',
              '#7042C9',
              '#0DB1AD',
              '#197BD2',
              '#C26D64',
            ],
          },
        ],
      },
      chartOptions: {
        responsive: false,
        maintainAspectRatio: false,
      },
    }
  },
  async created() {
    this.loaded = false
    console.log(this.chartData.labels)
    const current = getAuth().currentUser
    this.userID = current.uid
    const userRef = doc(db, 'users', this.userID)
    const exerciseCollection = collection(userRef, 'sportTracking')
    const exerciseSnapshot = await getDocs(exerciseCollection)
    console.log('length', exerciseSnapshot.docs.length)

    for (const doc of exerciseSnapshot.docs) {
      console.log(doc.data())
      const exerciseName = doc.data().name
      const exerciseDuration = doc.data().duration
      const exerciseRef = doc.data().type
      const exerciseCalorieSnap = await getDoc(exerciseRef)
      const exerciseCalorie = exerciseCalorieSnap.data().caloriesBurntPerMinute

      if (exerciseName in this.exerciseDict) {
        this.exerciseDict[exerciseName] += exerciseDuration * exerciseCalorie
      } else {
        this.exerciseDict[exerciseName] = exerciseDuration * exerciseCalorie
      }
    }
    console.log('hello hello', this.exerciseDict)
    let rawData = this.exerciseDict
    if (isProxy(this.exerciseDict)) {
      rawData = toRaw(this.exerciseDict)
    }
    console.log('hello raw', rawData)
    console.log('hello raw keys', Object.keys(rawData))
    console.log('hello raw keys', Object.values(rawData))

    console.log('before chartdata label', this.chartData.labels)
    console.log('before chartdata', this.chartData.datasets[0].data)

    this.chartData.labels = Object.keys(rawData)
    this.chartData.datasets[0].data = Object.values(rawData)

    console.log('chartdata label', this.chartData.labels)
    console.log('chartdata', this.chartData.datasets[0].data)

    this.loaded = true
  },
}
</script>

<style scoped>
.chart-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 170px;
  left: 330px;
  width: 440px;
  height: 440px;

  margin-bottom: 20px;
  background-color: #fde9ea;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.second-chart-wrapper {
  width: 90%;
  height: 90%;

  align-items: center;
  justify-content: center;

  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
}

#my-chart-id {
  margin: 0 auto;
  padding: 20px;
}

#header {
  font-family: 'Mulish', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
}

#no_data {
  text-align: center;
  font-family: 'Mulish', sans-serif;
  margin-bottom: 20px;
  margin-top: 50px;
}

.circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #fdf9f3;
}
</style>
