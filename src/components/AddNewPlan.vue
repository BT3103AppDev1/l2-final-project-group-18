<template>
    <div v-if = "showPlanAdd" class = "add-new-plan">
        <div class = "add-new-text">
            <p>Enter your exercise planning here: </p>
        </div>
        <div>
            <label>Exercise Type: </label>
            <input type = "text" v-model = "type">

            <label>Duration: </label>
            <input type = "text" v-model = "duration">

            <label>Date: </label>
            <input type = "date" v-model = "date">

            <label>Time Start: </label>
            <input type = "time" v-model = "timeStart">

            <label>Time End: </label>
            <input type = "time" v-model = "timeEnd">

            <button @click = "addExercisePlanning">Add</button>
        </div>

        <p><a class = "back-link" @click = "closeAdd">Back</a></p>
    </div>
</template>

<script>

import firebaseApp from '../firebase.js'
import { getFirestore, doc, getDoc, addDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
    name: 'PlanExercise',
    data() {
        return {
            type: '',
            duration: '',
            date: '',
            timeStart: '',
            timeEnd: ''
        }
    },
    props: {
        showPlanAdd: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        async addExercisePlanning() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                console.error("The user is not yet signed in");
            }

            const exercisePlanning = {
                exerciseName: this.type,
                duration: this.duration,
                date: this.date,
                timeStart: this.timeStart,
                timeEnd: this.timeEnd
            };

            const userRef = doc(db, "users", user.uid, "exercisePlanning")
            await addDoc(userRef, exercisePlanning);

        },
        closeAdd() {
            this.$emit('close');
        }
    }
}

</script>

<style scoped>

.add-new-plan {
    position: absolute;
    top: -450px;
    left: -40px;

    width: 650px;
    height: 280px;

    border-radius: 21px;

    background: #FAF4E1;
    border: 5px solid #9F978B;
    border-radius: 20px;

    z-index: 9999;
}

.add-new-text {
    position: relative;
    top: 5px;
    left: 20px;

    font-family: 'Mulish';
    font-style: normal;
    font-size: 20px;
    color: #746652;
}

.back-link {
    position: absolute;
    top: 10px;
    right: 10px;

    font-family: 'Mulish';
    font-style: normal;
    font-size: 15px;
    color: #746652;
}

.back-link:hover {
    color:brown;
    cursor: pointer;
    text-decoration: underline;
}

</style>

