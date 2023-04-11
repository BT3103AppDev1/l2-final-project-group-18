<template>
    <div v-if = "showPlanner" class = "exercise-planner">
        <div class = "back-button">
            <p><a class = "back-link" @click="closePlanner">Back</a></p>
        </div>

        <div class = "plan-header">
            <div>
                <p style="margin-left: 10px;">Current Plannings: </p>
            </div>
            <div class = "calendar-wrapper">
                <FullCalendar :options="calendarOptions" id = "calendar" />
                <!-- I saw the FullCalendar code in github and it doesn't support props defaultView and plugins. 
                    Instead it uses prop with name "options" -->
                <!-- inside Options, it require plugins and initialView, otherwise report viewType not found error. -->
            </div>
        </div>

        <div class = "add-button-wrapper">
            <button id = "add-button" @click = "showPlanAdd = true">Add New Plan</button>
            <AddNewPlan :showPlanAdd = "showPlanAdd" 
            @close = "showPlanAdd = false"
            @strategy = "closePopups" />
        </div>
    </div>
</template>

<script>

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddNewPlan from './AddNewPlan.vue';

import firebaseApp from '../firebase.js'
import { getFirestore, doc, collection, getDoc, onSnapshot, query } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const db = getFirestore(firebaseApp)

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
                events: [],
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
    mounted() {
        const user = getAuth().currentUser;

        if (!user) {
            console.error('The user is not yet signed in')
            return;
        }

        const exercisePlanRef = 
            collection(db, "users", user.uid, "exercisePlanning");
        const q = query(exercisePlanRef);
        console.log(q);

        onSnapshot(q, (snapshot) => {
            const events = [];
            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                this.getExerciseName(data.exerciseName).then((title) => {
                    const start = new Date(data.date + 'T' + data.timeStart);
                    const end = new Date(start.getTime() + data.duration * 60000);
                    const allDay = false;
                    events.push({title, start, end, allDay});
                })
            })
            console.log(events);
            this.calendarOptions.events = events;
        })
    },


    methods: {

        async getExerciseName(exerciseId) {
            const docRef = doc(db, "exerciseCalorie", exerciseId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                return data.name;
            } else {
                console.log("No such document!");
                return null;
            }
        },

        closePlanner() {
            this.$emit('close');
        },

        closePopups() {
            this.$emit('open');
            // setTimeout(() => {
            //     this.$emit('open');
            // }, 100);
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
    left: -460px;

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
    right: 20px;

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

/* .plan-header {
    position: relative;
    left: 10px;
} */

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
    
    font-family: 'Mulish', sans-serif;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    color: #746652;

    background: #FCB64E;
    border-radius: 30px;
}

</style>


