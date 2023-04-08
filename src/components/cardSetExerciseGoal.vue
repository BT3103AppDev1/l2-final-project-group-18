<template>
   
    <div class = "cardExercise">

        <div class = "sectionExercise">
            <div id = "left-elem-e">
                <p>{{ goalTitleE }}</p>
            </div>
            <div id = "right-elem-e">
                <button @click="($event) => (showPopUp2 = true)" id = "exerciseButton">SET</button>
            </div>
        </div>

        <div class = "divider"></div>

        <div class = "sectionExercise">
            <div id = "circle"></div>
            <div id = "no-goals-elem">
                <p>No goals currently</p>
            </div>
        </div>
        <div v-if="showPopUp2" class="overlayExercise">
            <SetExercisePopUp :showPopUp2 = "showPopUp2" @close="($event) => (showPopUp2 = false)"/>
        </div>
    </div>


</template>

<script>
import SetExercisePopUp from './SetExercisePopUp.vue'

export default {
    name: "CardSetExerciseGoal",
    components: {
        SetExercisePopUp,
    },
    data() {
        return {
            showPopUp2: false,
        }
    },
    props: {
        goalTitleE: {
            type: String,
            required: true,
        },
    },

}
</script>


<style>
/* cards / default */

.cardExercise {
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

.sectionExercise {
    display: flex;
    font-family: 'Mulish', sans-serif;
    padding-left: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
    
}

#left-elem-e {
    color: #C5C7CD;
    flex: 0.95;
}

#right-elem-e {
    padding-top: 11px;
    color: #746652;
}

#exerciseButton {
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

.overlayExercise {
    position: fixed;
    top: 20%;
    left: 30%;
    z-index: 9999;
    text-align: center;
    width: 700px;
    height: 300px;
}
</style>

