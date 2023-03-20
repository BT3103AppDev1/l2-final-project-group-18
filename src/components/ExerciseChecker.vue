<template>
    <div v-if = "showChecker" class = "exercise-checker">
        <!-- This item only rendered if showChecker = true -->

        <div class = "back-button">
            <p><a class = "back-link" @click = "closeChecker">Back</a></p>
        </div>

        <div class = "search-text">
            <p>Enter your exercise here to check amount of calories burnt per minute: </p>
        </div>

        <div class = "search-field">
            <p id = "search">Search</p>
        </div>

        <div class = "library-title">
            <p>Results</p>
        </div>

        <div class = "sample-result">
            <p id = "sport">Football (unit: minute)</p>
            <p id = "unit-calories">9.1 calories</p>
        </div>

        <div class = "add-button-wrapper">
            <button id = "add-button">Add New Exercise Type</button>
        </div>

    </div>
</template>

<script>

export default {
    name: 'Exercise-Checker',
    props: {
        showChecker: {
            type: Boolean,
            required: true
            // i.e. the parent must provide a value for it
        }
    },
    methods: {
        closeChecker() {
            this.$emit('close');
        }
    }
}

</script>

<style scoped>

.exercise-checker {
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

    width: 680px;
    height: 50px;

    background: #ECECEC;
    border: 1px solid #D6D6D6;
    border-radius: 30px

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

.sample-result {
    position: absolute;
    top: 200px;
    left: 20px;

    width: 680px;
    height: 100px;
    background: #DDD8BA;
    border-radius: 20px;
}

.sample-result #sport {
    position: absolute;
    left: 30px;

    width: 300px;
    font-family: 'Lato';
    font-style: normal;
    font-size: 28px;
    color: #A08666;
}

.sample-result #unit-calories {
    position: absolute;
    right: 50px;

    width: 120px;
    font-family: 'Lato';
    font-style: normal;
    font-size: 20px;
    color: #A08666;
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

