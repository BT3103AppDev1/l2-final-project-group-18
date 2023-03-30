<template>
    <div v-if = "showFoodChecker" class = "food-checker">
        <div class = "back-button">
            <p>
                <a class = "back-link" @click="closeFoodChecker">Back</a>
            </p>
        </div>

        <div>
            <div class = "search-text">
                <p>Enter your food here to check calories per serving: </p>
            </div>
            <div class = "search-field">
                <input class = "query-input" v-model.lazy = "searchFoodQuery"
                placeholder="Enter keyword">
                <button class = "query-button" @click="searchFood()">Search</button>
            </div>

            <div class = "library-title">
                <p>Results</p>
            </div>

            <div>
                <div v-if = "searchFoodResults.length === 0" 
                class = "default-checker-item">
                    <p class = "food-checker-name">No results found.</p>
                </div>
                <div v-else style = "overflow-y: scroll; max-height: 350px;" class = "check-item">
                    <FoodCheckerItem v-for = "(result, index) in searchFoodResults"
                    :key = "index" :foodName = "result.foodName"
                    :calorieFoodPerMinute = "result.caloriePerServing" />
                </div>
            </div>

        </div>

        <div class = "add-button-wrapper">
            <button id = "add-button" @click = "showFoodAdd = true">Add New Food Type</button>
            <AddNewFood :showFoodAdd = "showFoodAdd" @close = "showFoodAdd = false" />
        </div>    
    
    </div>
</template>

<script>

import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import FoodCheckerItem from './FoodCheckerItem.vue';
import AddNewFood from './AddNewFood.vue';

const db = getFirestore(firebaseApp)

export default {
    name: 'Food-Checker',
    components: {
        FoodCheckerItem,
        AddNewFood
    },
    data() {
        return {
            searchFoodQuery: "",
            searchFoodResults: [],
            showFoodAdd: false
        }
    },
    props: {
        showFoodChecker: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        async searchFood() {
            const foodRef = collection(db, "foodCalorieDatabase");
            const q = query(
                foodRef,
                where("foodName", ">=", this.searchFoodQuery),
                where("foodName", "<=", this.searchFoodQuery + "\uf8ff")
            );
            try {
                const querySnapshot = await getDocs(q);
                const results = querySnapshot.docs.map((doc) =>
                    doc.data());
                this.searchFoodResults = results;
            } catch (error) {
                console.error("Error searching food: ", error);
            }
        },
        closeFoodChecker() {
            this.$emit('close');
        }
    },
    watch: {
        searchFoodQuery() {
            this.searchFoodResults = [],
            this.searchFood()
        }
    }
}

</script>

<style scoped>

.food-checker {
    position: absolute;
    top: -100px;
    left: 160px;

    width: 800px;
    height: 670px;
    background: #FAF4E1;
    border: 5px solid #9F978B;
    border-radius: 20px;
}

.back-button {
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

.search-text {
    position: absolute;
    top: 10px;
    left: 20px;

    font-family: 'Mulish';
    font-style: normal;
    font-size: 20px;
    color: #746652;
}

.library-title {
    position: absolute;
    top: 120px;
    left: 20px;

    font-family: 'Mulish';
    font-style: normal;
    font-size: 20px;
    color: #746652;
}

.search-field {
    position: absolute;
    top: 70px;
    left: 20px;
}

input {
    width: 650px;
    height: 35px;

    background: #ECECEC;
    border: 1px solid #D6D6D6;
    border-radius: 54px;
}

.query-input::placeholder {
    text-indent: 30px;
    font-family: 'Mulish';
    font-size: 16px;
    color: #B5B7B9;
}

.query-button {
    background-color: #A08666;
    border: 2px solid #746652;
    border-radius: 8px;
    color: white;
    font-family: 'Mulish';
    font-size: 16px;
    padding: 10px;
}

.default-checker-item {
    position: absolute;
    top: 200px;
    left: 20px;
    
    width: 750px;
    height: 100px;
    background-color: #DDD8BA;
    border-radius: 20px;
}

.food-checker-name {
    position: absolute;
    top: 10px;
    left: 30px;

    width: 300px;
    font-family: 'Lato';
    font-style: normal;
    font-size: 28px;
    color: #A08666;
}

.check-item {
    position: absolute;
    top: 200px;
    left: 20px;
    width: 750px;
}

.add-button-wrapper {
    position: absolute;
    left: 100px;
    top: 580px;

    width: 700px;
    height: 50px;
}

#add-button {

    width: 600px;
    height: 50px;
    
    font-family: 'Mulish';
    font-style: normal;
    font-size: 20px;
    text-align: center;
    color: #746652;

    background: #FCB64E;
    border-radius: 30px;
}


</style>

