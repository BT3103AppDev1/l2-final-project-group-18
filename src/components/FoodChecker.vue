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

            </div>

            <div class = "library-title">
                <p>Results</p>
            </div>
        </div>

        <div class = "add-button-wrapper">
            <button id = "add-button" @click = "showFoodAdd = true">Add New Food Type</button>
            <AddNewFood :showFoodAdd = "showFoodAdd" @close = "showFoodAdd = false" />
        </div>    
    
    </div>
</template>

<script>

import AddNewFood from './AddNewFood.vue';

export default {
    name: 'Food-Checker',
    components: {
        AddNewFood
    },
    data() {
        return {
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
        closeFoodChecker() {
            this.$emit('close');
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

