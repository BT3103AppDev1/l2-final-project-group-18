<template>
    <div v-if = "showAdd" class = "add-new-exercise">
        <input type = "text" v-model.lazy = "exerciseType" placeholder="Exercise Type">
        <input type = "number" v-model.lazy = "caloriesMin" placeholder="Calories Per Min">
        <button @click="addExercise">Add</button>

        <button @click = "closeAdd">Back</button>
    </div>
</template>

<script>

// Directly add from AddNewExercise

import firebaseApp from '../firebase.js';
import { collection, getFirestore } from 'firebase/firestore';
import { addDoc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
    name: 'AddExercise',
    data() {
        return {
            exerciseType: "",
            caloriesMin: ""
        }
    },
    props: {
        showAdd: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        async addExercise() {
            if (!this.exerciseType || !this.caloriesMin) return; // validate inputs

            try {
                const docRef = await addDoc(collection(db, "exerciseCalorieDatabase"), {
                    exerciseName: this.exerciseType,
                    calorieBurntPerMin: parseFloat(this.caloriesMin)
                });
                // console.log(docRef)
                const docSnap = await getDoc(docRef);
                console.log("Added document data:", docSnap.data());
            } catch(error) {
                console.error("Error adding document: ", error);
            }
            
            // this.$emit('exercise-added', {
            //     type: this.exerciseType,
            //     calories: parseInt(this.caloriesMin)
            // }); // emits an event named 'exercise-added', which has 2 properties, type and calories
            
            this.exerciseType = '';
            this.caloriesMin = '';
        },
        closeAdd() {
            this.$emit('close');
        }
    }
}

</script>
