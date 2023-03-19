<template>
    <div class = "exercise-tool-wrapper">
        
        <div class = "exercise-tool-title">
            <h4>Exercise Tracking Utility Tools</h4>
        </div>
        <div class = "calorie-checker-title">
            <h4>
                <a @click = "showChecker=true">Calorie Checker</a>
                <ExerciseChecker :showChecker="showChecker" 
                @close="showChecker = false"
                class = "exercise-checker-overlay" /> <!-- Mainly for adjusting z-index -->
                <!-- You must declare showChecker property before you can use it -->
            </h4>                
        </div>

        <div class = "calorie-checker-wrapper">
            <!-- Originally title is put here, later move outside to ensure correct display of ExerciseChecker -->
            <div class = "calorie-checker-intro">
                <p>Check the calorie burnt per minute for different types of sports!</p>
            </div>
        </div>

        <div class = "calorie-calculator-wrapper">
            <div class = "calorie-calculator-title">
                <h4>Calorie Calculator</h4>
            </div>
            <div class = "calorie-calculator-intro">
                <p>Calculate your current weekly calories burnt!</p>
            </div>
        </div>

        <div class = "exercise-planning-wrapper">
            <div class = "exercise-planning-title">
                <h4>Exercise Planning</h4>
            </div>
            <div class = "exercise-planning-intro">
                <p>Plan your personal fitness activities!</p>
            </div>
        </div>    

    </div>
</template>

<script>

import ExerciseChecker from './ExerciseChecker.vue';

export default {
    name: "Exercise-Tools",
    components: {
        ExerciseChecker
    },
    data() {
        return {
            showChecker: false
        }
    }
}

</script>

<style scoped>

.exercise-checker-overlay {
    position: absolute;
    z-index: 9999; /* Set the z-index value to a high number */
}

.exercise-tool-wrapper {
    position: absolute;
    top: 100px;
    left: 320px;
}

.exercise-tool-title {
    position: absolute;
    top: 0px;
    left: 10px;

    width: 400px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;

    color: #588061;
}

.calorie-checker-wrapper {
    position: absolute;
    width: 300px;
    height: 200px;
    left: 10px;
    top: 80px;

    background: #FDF6E9;
    border: 1px solid #DDE2FF;
    border-radius: 8px; 
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));   
}

.calorie-checker-title {
    position: absolute;
    top: 60px;
    left: 30px;
    width: 300px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 31px;

    z-index: 10; /* Make the title display on top of the background */

    color: #9A6F56;
}

.calorie-checker-intro {
    position: absolute;
    width: 100px;
    height: 80px;
    top: 80px;
    left: 150px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.4px;

    color: #7D7D7D;
}

.calorie-calculator-wrapper {
    position: absolute;
    width: 300px;
    height: 200px;
    top: 80px;
    left: 330px;

    background: #FDF6E9;
    border: 1px solid #DDE2FF;
    border-radius: 8px; 
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));   
}

.calorie-calculator-title {
    position: absolute;
    top: -20px;
    left: 30px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 31px;

    color: #9A6F56;
}

.calorie-calculator-intro {
    position: absolute;
    width: 100px;
    height: 80px;
    top: 80px;
    left: 150px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.4px;

    color: #7D7D7D;
}

.exercise-planning-wrapper {
    position: absolute;
    width: 300px;
    height: 200px;
    left: 650px;
    top: 80px;

    background: #FDF6E9;
    border: 1px solid #DDE2FF;
    border-radius: 8px; 
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));   
}

.exercise-planning-title {
    position: absolute;
    top: -20px;
    left: 30px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 31px;

    color: #9A6F56;
}

.exercise-planning-intro {
    position: absolute;
    width: 100px;
    height: 80px;
    top: 80px;
    left: 150px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.4px;

    color: #7D7D7D;
}

</style>

