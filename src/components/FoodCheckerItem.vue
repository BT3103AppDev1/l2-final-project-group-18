<template>
    <div class = "food-checker-item">
        <div class = "food-checker-name">{{ foodName }} </div>
        <div class = "calorie-per-min">{{ calorieFoodPerMinute }} </div>
    </div>   
</template>

<script>

export default {
    props: {
        foodName: {
            type: String,
            required: true
        },
        calorieFoodPerMinute: {
            type: Number,
            required: true
        }
    }
}

</script>

<style scoped>
.food-checker-item {
    width: 700px;
    height: 100px;
    background-color: #DDD8BA;
    border-radius: 20px;
    margin: 5px;
}

.food-checker-name {
    position: relative;
    top: 30px;
    left: 30px;

    width: 300px;
    font-family: 'Mulish', sans-serif;
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
    font-family: 'Mulish', sans-serif;
    font-style: normal;
    font-size: 20px;
    color: #A08666;
}


</style>



