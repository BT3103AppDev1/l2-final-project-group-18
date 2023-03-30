<template>
    <div class = "current-goal-wrapper">
        
        <h1>Current Goals</h1>
        <div class = "first">
            <cardSetGoal :firstPopUpComponent="setGoalPopUp" goalTitle="Set weight gain/ weight loss goal"></cardSetGoal>
        </div>
        <div class = "second">
            <cardSetGoal goalTitle="Set weekly exercise goal"></cardSetGoal>
        </div>
        <div class = "third">
            <cardSetGoal goalTitle="Set daily calorie intake goal"></cardSetGoal>
        </div>
        <div class = "fourth">
            <cardUpdateGoal goalTitle="Update weight gain/ weight loss goal"></cardUpdateGoal>
        </div>
        


    </div>

</template>

<script>
import cardSetGoal from '../components/cardSetGoal.vue';
import cardUpdateGoal from '../components/cardUpdateGoal.vue';
import setGoalPopUp from '../components/setGoalPopUp.vue';

export default {
    name: "SetGoalComponent",
    components: {
        cardSetGoal,
        cardUpdateGoal,
        setGoalPopUp,
    }
}
</script>


<style scoped>
/* weight gain/loss */

.current-goal-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    /* right:0 -> the element should be positioned at the right edge of its parent element */
    width: 82%;
    height: 18%;
    /* background-color: #FBF5F4; */
}


h1 {
    position: absolute;
    left: 40px;
    top: 10px;
    font-family: 'Mulish', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 25px;
}

.second {
    position: absolute;
    top: 150px;
}

.third {
    position: absolute;
    top: 300px;
}

.fourth {
    position: absolute;
    top: 450px;
}

</style>

