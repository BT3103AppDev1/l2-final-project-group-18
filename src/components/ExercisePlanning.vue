<template>
    <div v-if = "showPlanner" class = "exercise-planner">
        <div class = "back-button">
            <p><a class = "back-link" @click="closePlanner">Back</a></p>
        </div>

        <div>
            <div class = "plan-header">
                <p>Current Plannings: </p>
            </div>
            <div class = "calendar-wrapper">
                <FullCalendar :options="calendarOptions" />
                <!-- I saw the FullCalendar code in github and it doesn't support props defaultView and plugins. 
                    Instead it uses prop with name "options" -->
                <!-- inside Options, it require plugins and initialView, otherwise report viewType not found error. -->
            </div>
        </div>

        <div class = "add-button-wrapper">
            <button id = "add-button" @click = "showPlanAdd = true">Add New Plan</button>
            <AddNewPlan :showPlanAdd = "showPlanAdd" @close = "showPlanAdd = false" />
        </div>
    </div>
</template>

<script>

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddNewPlan from './AddNewPlan.vue';

export default {
    name: 'Exercise-Planner',
    components: {
        AddNewPlan,
        FullCalendar
    },
    data() {
        return {
            exercisePlanData: [],
            showPlanAdd: false,
            calendarOptions: {
                plugins: [ dayGridPlugin ],
                initialView: 'dayGridMonth',
                events: [
                    { title: 'event1', start: '2023-04-01' },
                    { title: 'event2', start: '2023-04-05', end: '2023-04-07' },
                    { title: 'event3', start: '2023-04-09T12:30:00', allDay: false }
                ],
                eventColor: "#CAA542",
                contentHeight: "440px"
            }
        }
        
    },
    props: {
        showPlanner: {
            type: Boolean,
            required: true
        }
    },
    created() {
        this.fetchExercisePlanData();
    },
    // mounted() {
    //     FullCalendar.use(dayGridPlugin); // Add the dayGridPlugin as a plugin
    // },
    methods: {
        async fetchExercisePlanData() {
            this.exercisePlanData = [];
        },
        closePlanner() {
            this.$emit('close');
        }
    },
    computed: {
        calendarEvents() {
            return this.exercisePlanData;
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

.calendar-wrapper {
    /* max-height: 400px; */
    font-size: 14px;
    /* overflow-y: scroll; */
    margin: 15px;

    z-index: 10;
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


