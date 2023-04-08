<template>
    <div class = "current-goal-wrapper">
        
        <h1 id = "title">Current Goals</h1>

        <div class = "first" v-if= "hasWeightData">
            <CardUpdateGoal goalTitleU="Update weight gain/ weight loss goal"></CardUpdateGoal>
        </div>
        <div class = "first" v-else>
            <CardSetGoal goalTitle="Set weight gain/ weight loss goal"></CardSetGoal>
        </div>

        <div class = "second" v-if="hasExerciseData">
            <CardUpdateExerciseGoal goalTitleUE="Update weekly exercise goal"></CardUpdateExerciseGoal>
        </div>
        <div class="second" v-else>
            <CardSetExerciseGoal goalTitleE="Set weekly exercise goal"></CardSetExerciseGoal>
        </div>

        <div class="third" v-if="hasCalorieData">
            <CardUpdateCalorieGoal goalTitleUC="Update daily calorie intake goal"></CardUpdateCalorieGoal>
        </div>
        <div class="third" v-else>
            <CardSetCalorieGoal goalTitleC="Set daily calorie intake goal"></CardSetCalorieGoal>
        </div>
        
    </div>

</template>

<script>
import CardSetGoal from '../components/CardSetGoal.vue';
import CardSetExerciseGoal from './CardSetExerciseGoal.vue';
import CardSetCalorieGoal from './CardSetCalorieGoal.vue';
import CardUpdateCalorieGoal from './CardUpdateCalorieGoal.vue';
import CardUpdateExerciseGoal from './CardUpdateExerciseGoal.vue';
import CardUpdateGoal from './CardUpdateGoal.vue';


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
    name: "SetGoalComponent",
    components: {
        CardSetGoal,
        CardSetExerciseGoal,
        CardSetCalorieGoal,
        CardUpdateCalorieGoal,
        CardUpdateExerciseGoal,
        CardUpdateGoal,
    },
    data() {
        return {
            targetMin: null,
            targetCalorie: null,
            daysToCompleteGoal: null,
            weightChangeInKg: null,
            weightGainOrLoss: null,
            userID: '',
        }
    },
    created() { 
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.userID = user.uid
            this.getWeightData();
            this.getExerciseData();
            this.getCalorieData();
        }
        })
    },
    methods: {
        async getExerciseData() {
            const userRef = doc(db, 'users', this.userID)
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoSnapshot = await getDoc(doc(goalInfoCollection, 'weeklyExercise'))

            if (goalInfoSnapshot.exists()) { 
                this.targetMin = goalInfoSnapshot.data().targetMin;
            }
        },
        async getCalorieData() {
            const userRef = doc(db, 'users', this.userID)
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoSnapshot = await getDoc(doc(goalInfoCollection, 'dailyCalorie'))

            if (goalInfoSnapshot.exists()) { 
                this.targetCalorie = goalInfoSnapshot.data().targetCalorie;
            }
        },
        async getWeightData() {
            const userRef = doc(db, 'users', this.userID)
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoSnapshot = await getDoc(doc(goalInfoCollection, 'weightGoals'))
            
            if (goalInfoSnapshot.exists()) {
                this.daysToCompleteGoal = goalInfoSnapshot.data().daysToCompleteGoal;
                this.weightChangeInKg = goalInfoSnapshot.data().weightChangeInKg;
                this.weightGainOrLoss = goalInfoSnapshot.data().weightGainOrLoss;
            }
        },
    },
    computed: {
        hasExerciseData() {
            return this.targetMin !== null && this.targetMin !== 0;
        },
        hasCalorieData() {
            return this.targetCalorie !== null && this.targetCalorie !== 0;
        },
        hasWeightData() {
            return this.weightChangeInKg !== null && this.weightChangeInKg !== 0;
        }
    }
}
</script>


<style scoped>
/* weight gain/loss */

.current-goal-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    /* right:0 -> the element should be positioned at the right edge of its parent element */
    width: 82%;
    height: 18%;
    /* background-color: #FBF5F4; */
}


h1 {
    position: absolute;
    left: 40px;
    top: 10px;
    font-family: 'Mulish', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 25px;
}

.second {
    position: absolute;
    top: 150px;
}

.third {
    position: absolute;
    top: 300px;
}


</style>

