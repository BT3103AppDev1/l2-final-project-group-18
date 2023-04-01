<template>
    <div v-if = "showPlanner" class = "exercise-planner">
        <div class = "back-button">
            <p><a class = "back-link" @click="closePlanner">Back</a></p>
        </div>

        <div>
            <div class = "plan-header">
                <p>Current Plannings: </p>
            </div>
        </div>

        <div class = "add-button-wrapper">
            <button id = "add-button" @click = "showPlanAdd = true">Add New Plan</button>
            <AddNewPlan :showPlanAdd = "showPlanAdd" @close = "showPlanAdd = false" />
        </div>
    </div>
</template>

<script>

import AddNewPlan from './AddNewPlan.vue';

export default {
    name: 'Exercise-Planner',
    components: {
        AddNewPlan
    },
    data() {
        return {
            showPlanAdd: false
        }
    },
    props: {
        showPlanner: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closePlanner() {
            this.$emit('close');
        }
    }
}

</script>

<style scoped>

.exercise-planner {
    position: absolute;
    top: -100px;
    left: -480px;

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


