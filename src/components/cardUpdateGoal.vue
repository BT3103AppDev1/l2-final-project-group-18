<template>
   
    <div class = "cardUpdate">

        <div class = "section">
            <div id = "left-elem">
                <p>{{ goalTitle }}</p>
            </div>
            <div id = "right-elem">
                <button @click="($event) => (showUpdate = true)" id = "updateButton">UPDATE</button>
            </div>
        </div>

        <div class = "divider"></div>

        <div class = "section">
            <div id = "circle"></div>
            <div id = "no-goals-elem">
                <p v-if="weightGainOrLoss === 'Weight Gain'">I want to gain {{ weightChangeInKg }} kg in {{ daysToCompleteGoal }} days</p>
                <p v-if="weightGainOrLoss === 'Weight Loss'">I want to lose {{ weightChangeInKg }} kg in {{ daysToCompleteGoal }} days</p>
            </div>
        </div>

        <div v-if="showUpdate" class="overlay">
            <SetGoalPopUp :showUpdate="showUpdate" @close="($event) => (showUpdate = false)"/>
        </div>

    </div>


</template>

<script>
import UpdateGoalPopUp from './UpdateGoalPopUp.vue'
import firebaseApp from '../firebase.js'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const db = getFirestore(firebaseApp)

export default {
    name: "cardUpdateGoal",
    components: {
        UpdateGoalPopUp,
    },
    data() {
        return {
            showUpdate: false,
            daysToCompleteGoal: 0,
            weightChangeInKg: 0,
            weightGainOrLoss: ''

        };
    },
    props: {
        goalTitle: {
            type: String,
            required: true,
        },
    },
    mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user
        }
        })
        this.fetchWeightGoal()
    },
    methods: {
        async fetchWeightGoal() {
            const userRef = doc(db, 'users', 'UZwy1hqjve1VIUsgIrhy')
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoSnapshot = await getDoc(doc(goalInfoCollection, 'weightGoals'))
            
            this.daysToCompleteGoal = goalInfoSnapshot.data().daysToCompleteGoal;
            this.weightChangeInKg = goalInfoSnapshot.data().weightChangeInKg;
            this.weightGainOrLoss = goalInfoSnapshot.data().weightGainOrLoss;

        },
    }

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
    border: 1px solid #DFE0EB;
}

.section {
    display: flex;
    font-family: 'Mulish', sans-serif;
    padding-left: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
    
}

#left-elem {
    color: #C5C7CD;
    flex: 0.95;
}

#right-elem {
    padding-top: 11px;
    color: #746652;
}

#updateButton {
    background-color: #FCB64E;
    width: 80px;
    height: 24px;
    border-radius: 8px;
}

/* sheet */

.divider {
    border: 1px solid #DFE0EB;
    border-radius: 8px;
}

#circle {
  border-radius: 50%;
  border: 2px solid #DFE0EB;
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
    top: 13%;
    left: 30%;
    z-index: 9999;
    text-align: center;
    width: 700px;
    height: 300px;
}
</style>

