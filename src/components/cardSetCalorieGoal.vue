<template>
   
    <div class = "cardCalorie">

        <div class = "sectionCalorie">
            <div id = "left-elem-c">
                <p>{{ goalTitleC }}</p>
            </div>
            <div id = "right-elem-c">
                <button @click="($event) => (showPopUp3 = true)" id = "calorieButton">SET</button>
            </div>
        </div>

        <div class = "divider"></div>

        <div class = "sectionCalorie">
            <div id = "circle"></div>
            <div id = "no-goals-elem">
                <p>No goals currently</p>
            </div>
        </div>
        <div v-if="showPopUp3" class="overlayCalorie">
            <SetCaloriePopUp :showPopUp3 = "showPopUp3" @close="($event) => (showPopUp3 = false)"/>
        </div>
    </div>


</template>

<script>
import SetCaloriePopUp from './SetCaloriePopUp.vue'

export default {
    name: "CardSetCalorieGoal",
    components: {
        SetCaloriePopUp,
    },
    data() {
        return {
            showPopUp3: false,
        }
    },
    props: {
        goalTitleC: {
            type: String,
            required: true,
        },
    },

}
</script>


<style>
/* cards / default */

.cardCalorie {
    position: absolute;
    left: 40px;
    top: 110px;
    width: 800px;
    height: 116px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid #DFE0EB;
}

.sectionCalorie {
    display: flex;
    font-family: 'Mulish', sans-serif;
    padding-left: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
    
}

#left-elem-c {
    color: #C5C7CD;
    flex: 0.95;
}

#right-elem-c {
    padding-top: 11px;
    color: #746652;
}

#calorieButton {
    background-color: #FCB64E;
    width: 54px;
    height: 24px;
    border-radius: 8px;
}

/* sheet */

.divider {
    border: 1px solid #DFE0EB;
    border-radius: 8px;
}

#circle {
  border-radius: 50%;
  border: 2px solid #DFE0EB;
  background-color: transparent;
  width: 15px;
  height: 15px;
  margin-top: 13px;
  margin-right: 20px;
}

#no-goals-elem {
    color: #252733;
}

.overlayCalorie {
    position: fixed;
    top: 20%;
    left: 30%;
    z-index: 9999;
    text-align: center;
    width: 700px;
    height: 300px;
}
</style>

