<template>
    <div v-if = "showPlanAdd" class = "add-new-plan">
        <div class = "add-new-text">
            <p>Enter your exercise planning here: </p>
        </div>
        <div>
            <div>
                <label>Exercise Type: </label>
                <select v-model = "selectedExercise">
                    <option v-for = "exercise in exercises" 
                    :key = "exercise.id" :value = "exercise.id">
                        {{ exercise.name }}
                    </option>
                </select>
            </div>

            <div>
                <label>Duration: </label>
                <input type = "text" v-model = "duration">
            </div>

            <div>
                <label>Date: </label>
                <input type = "date" v-model = "date">
            </div>

            <div>
                <label>Time Start: </label>
                <input type = "time" v-model = "timeStart">
            </div>

            <!-- timeEnd -->

            <button @click = "addExercisePlanning">Add</button>
        </div>

        <p><a class = "back-link" @click = "closeAdd">Back</a></p>
    </div>
</template>

<script>

import firebaseApp from '../firebase.js'
import { getFirestore, doc, setDoc, collection, addDoc, onSnapshot } from 'firebase/firestore'
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
            exercises: []
        }
    },
    props: {
        showPlanAdd: {
            type: Boolean,
            required: true
        }
    },
    created() {
        const exerciseRef = collection(db, "exerciseCalorie");
        onSnapshot(exerciseRef, (snapshot) => {
            const exercises = [];
            snapshot.forEach((doc) => {
                exercises.push({
                    id: doc.id,
                    name: doc.data().name
                });
            });
            this.exercises = exercises;
        });
    },
    methods: {
        async addExercisePlanning() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                console.error("The user is not yet signed in");
            }

            const exercisePlanning = {
                exerciseName: this.selectedExercise,
                // This is storing the ID of the exercise record
                // Later can do const exerciseDocRef = doc(db, "exerciseCalorie", this.selectedExercise);
                // given this is a valid ID, can retrieve exerciseDocRef.name
                duration: this.duration,
                date: this.date,
                timeStart: this.timeStart,
            };

            const userRef = doc(db, "users", user.uid, "exercisePlanning", new Date().toISOString());
            await setDoc(userRef, exercisePlanning);

            this.selectedExercise = null;
            this.duration = null;
            this.date = null;
            this.timeStart = null;

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

