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
    }
}

</script>

<style>
.exercise-checker-item {
    background-color: orange;
    width: 200px;
    height: 100px;
}

</style>

