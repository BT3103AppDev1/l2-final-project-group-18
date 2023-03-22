<template>
    <div class = "exercise-checker-item">
        <div class = "exercise-checker-name">{{ exerciseName }} </div>
        <div class = "calorie-per-min">{{ caloriePerMinute }} </div>
    </div>
</template>

<script>

export default {
    props: {
        exerciseName: {
            type: String,
            required: true 
        },
        caloriePerMinute: {
            type: Number,
            required: true
        }
    },
    mounted() {
        console.log('caloriePerMinute:', this.caloriePerMinute)
    }
}

</script>

<style scoped>
.exercise-checker-item {

    width: 700px;
    height: 100px;
    background-color: #DDD8BA;
    border-radius: 20px;
    margin: 5px;
}

.exercise-checker-name {
    position: relative;
    top: 30px;
    left: 30px;

    width: 300px;
    font-family: 'Lato';
    font-style: normal;
    font-size: 28px;
    color: #A08666;
}

.calorie-per-min {
    position: relative; 
    /* You should use relative position, if you want each 
    entry to adjust based on its current positioning */
    top: 0px;
    left: 550px;

    width: 120px;
    font-family: 'Lato';
    font-style: normal;
    font-size: 20px;
    color: #A08666;
}

</style>

