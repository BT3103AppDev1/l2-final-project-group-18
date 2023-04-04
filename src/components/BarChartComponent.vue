<template>
    <div class = "barchart-wrapper">
        <h3>Weekly food calorie intake</h3>
        <h5>Total intake</h5>
        <column-chart :data="calorieData" 
        :library="{legend: 
            {display: false}, 
            scales: {yAxes: [{ticks: {beginAtZero: true}}]}}"
        /> 
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, collection, doc, getDocs, writeBatch, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { reactive } from "vue";

// import { ColumnChart } from 'vue-chartkick';

const db = getFirestore(firebaseApp);

export default {
    name: "BarChatComponent",
    // components: {
    //     ColumnChart
    // },

    data() {
        return {
            calorieStats: reactive({}),
            chartData: {'Monday': 2, 'Tuesday': 5, 'Wednesday': 2, 'Thursday': 4, 'Friday': 6}
        }
    },
    mounted() {
        const currentUser = getAuth().currentUser;
        console.log("Get current user");

        const calorieStatsRef = 
            collection(doc(getFirestore(), "users", currentUser.uid), "calorieStats");
        console.log("Get collection");

        getDocs(calorieStatsRef).then((snapshot) => {
            if (snapshot.size > 0) {
                console.log("calorieStats already exists");
                snapshot.forEach((doc) => {
                    this.calorieStats[doc.id] = doc.data().calorie;
                });
                console.log(JSON.stringify(this.calorieStats));
            } else {
                console.log("calorieStats collection does not exist");

                const batch = writeBatch(db);
                const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                daysOfWeek.forEach((day) => {
                    const docRef = doc(calorieStatsRef, day);
                    batch.set(docRef, { calorie: 0 });
                });

                batch.commit().then(() => {
                    console.log("calorieStats collection and documents created successfully");
                }).catch((error) => {
                    console.log("Error creating calorieStats collection and documents:", error);
                });   
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },
    computed: {
        calorieData() {
            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            const data = {};
            daysOfWeek.forEach((day) => {
                data[day] = this.calorieStats[day];
            });
            return data;
        }
    }
}

</script>

<style scoped>

.barchart-wrapper {
    position: absolute;
    top: 20px;
    left: 400px;
}

</style>
