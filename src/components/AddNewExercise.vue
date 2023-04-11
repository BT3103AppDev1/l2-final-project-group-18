<template>
    <div v-if = "showAdd" class = "add-new-exercise">
        <div class = "add-new-text">
            <p>Add new exercise type and calories burnt per minute </p>
        </div>

        <p class = "before-input">Exercise Type: 
        <input type = "text" v-model.lazy = "exerciseType"></p>
        
        <p class = "before-input">Calories / min: 
        <input type = "number" v-model.lazy = "caloriesMin"> </p>
        <button class = "add-exercise-button" @click="addExercise">Add</button>

        <!-- <button @click = "closeAdd">Back</button> -->
        <p><a class = "back-link" @click = "closeAdd">Back</a></p>
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
                const docRef = await addDoc(collection(db, "exerciseCalorie"), {
                    name: this.exerciseType,
                    caloriesBurntPerMinute: parseFloat(this.caloriesMin)
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

<style scoped>

.add-new-exercise {
    position: absolute;
    top: -450px;
    left: -40px;

    width: 650px;
    height: 280px;

    border-radius: 21px;

    background: #FAF4E1;
    border: 5px solid #9F978B;
    border-radius: 20px;
}

input {
    position: relative;
    left: 10px;

    width: 390px;
    height: 35px;

    background: #ECECEC;
    border: 1px solid #C1C1C1;
    border-radius: 20px;   
    
    padding-left: 20px;
    font-family: 'Mulish', sans-serif;
    font-size: 17px;
}

.before-input {
    position: relative;
    left: 20px;
    
    font-family: 'Mulish', sans-serif;
    font-style: normal;
    font-size: 24px;

    color: #b0803e;    
}

.add-new-text {
    position: relative;
    top: 5px;
    left: 20px;

    font-family: 'Mulish', sans-serif;
    font-style: normal;
    font-size: 20px;
    color: #746652;
}

.add-exercise-button {
    position: relative;
    left: 20px;
    width: 600px;
    height: 50px;
    
    font-family: 'Mulish', sans-serif;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    color: #746652;

    background: #FCB64E;
    border-radius: 30px;
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
