<template>
    <div v-if = "showChecker" class = "exercise-checker">
        <!-- This item only rendered if showChecker = true -->

        <div class = "back-button">
            <p><a class = "back-link" @click = "closeChecker">Back</a></p>
        </div>

        <div>
            <div class = "search-text">
                <p>Enter your exercise here to check amount of calories burnt per minute: </p>
            </div>
            <div class = "search-field">
                <input class = "query-input" v-model.lazy="searchQuery" placeholder="Enter keyword">
                <button class = "query-button" @click = "searchExercises()">Search</button>
            </div> 
            
            <div class = "library-title">
                <p>Results</p>
            </div>
            
            <div>
                <div v-if = "searchResults.length === 0" class = "default-checker-item">
                    <p class = "exercise-checker-name">No results found.</p>
                </div>
                <div v-else style="overflow-y: scroll; max-height: 350px;" class = "check-item">
                    <!-- This is how you can add scroll bar to handle too-many search results -->

                    <exercise-checker-item v-for = "(result, index) in searchResults"
                    :key="index" :exerciseName = "result.name"
                    :caloriePerMinute = "result.caloriesBurntPerMinute" />
                    <!-- Generate one ExerciseCheckerItem for every search result -->
                </div>
            </div>
            
        </div>

        <div class = "add-button-wrapper">
            <button id = "add-button" @click = "showAdd=true">Add New Exercise</button>
            <AddNewExercise :showAdd="showAdd" @close="showAdd=false" />
        </div>
        
    </div>
</template>

<script>

import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import ExerciseCheckerItem from './ExerciseCheckerItem.vue';
import AddNewExercise from './AddNewExercise.vue';

const db = getFirestore(firebaseApp)

export default {
    name: 'Exercise-Checker',
    components: {
        ExerciseCheckerItem,
        AddNewExercise
    },
    data() {
        return {
            searchQuery: "",
            searchResults: [],
            showAdd: false
        }
    },
    props: {
        showChecker: {
            type: Boolean,
            required: true
            // i.e. the parent must provide a value for it
        }
    },
    methods: {
        async searchExercises() {
            const exercisesRef = collection(db, "exerciseCalorie");

            const q = query(
                exercisesRef,
                where("name", ">=", this.searchQuery),
                where("name", "<=", this.searchQuery + "\uf8ff")
            );
            try {
                const querySnapshot = await getDocs(q);
                const results = querySnapshot.docs.map((doc) => doc.data());
                console.log(results);
                this.searchResults = results;
            } catch (error) {
                console.error("Error searching exercises: ", error);
            }          
        },
        closeChecker() {
            this.$emit('close');
        }
    },
    watch: {
        searchQuery() {
            this.searchResults = []
            this.searchExercises()
        }
    }
}

</script>

<style scoped>

.exercise-checker {
    position: absolute;
    top: -100px;
    left: -450px;

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

    padding-left: 20px;
    font-family: 'Mulish';
    font-size: 18px;
}

.query-input::placeholder {
    text-indent: 30px;
    font-family: 'Mulish';
    font-size: 16px;
    color: #B5B7B9;

    position: relative;
    left: -15px;
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

.search-field #search {
    position: absolute;
    top: -5px;
    left: 40px;
    font-family: 'Mulish';
    font-style: normal;
    font-size: 18px;
    color: #B5B7B9;
    text-align: center;
}

.exercise-checker-name {
    position: absolute;
    top: 10px;
    left: 30px;

    width: 300px;
    font-family: 'Lato';
    font-style: normal;
    font-size: 28px;
    color: #A08666;
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

.add-button-wrapper #add-button {

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


