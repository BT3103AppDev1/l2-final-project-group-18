<template>
    <div v-if = "showFoodAdd" class = "add-new-food">
        <div class = "add-new-text">
            <p>Add new food type and calories per 100g: </p>
        </div>       

        <p class = "before-input">
            Food Type: 
            <input type = "text" v-model.lazy ="foodType">
        </p>
        <p class = "before-input">
            Calories / 100g: 
            <input type = "number" v-model.lazy = "caloriesMin">
        </p>
        <button class = "add-food-button" @click="addFood">Add</button>

        <p>
            <a class = "back-link" @click = "closeFoodAdd">Back</a>
        </p>
    </div>

</template>

<script>

import firebaseApp from '../firebase.js';
import { collection, getFirestore } from 'firebase/firestore';
import { addDoc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
    name: 'AddFood',
    data() {
        return {
            foodType: "",
            caloriesMin: ""
        }
    },
    props: {
        showFoodAdd: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        async addFood() {
            if (!this.foodType || !this.caloriesMin) return;

            try {
                const docRef = await addDoc(collection(
                    db, "foodCalorie"
                ), {
                    name: this.foodType,
                    caloriesIntakePer100g: parseFloat(this.caloriesMin)
                });
                const docSnap = await getDoc(docRef);
                console.log("Added document data:", docSnap.data());
            } catch(error) {
                console.error("Error adding document: ", error);
            }

            this.foodType = '';
            this.caloriesMin = '';
        },
        closeFoodAdd() {
            this.$emit('close');
        }
    }
}

</script>

<style scoped>

.add-new-food {
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

.add-food-button {
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

