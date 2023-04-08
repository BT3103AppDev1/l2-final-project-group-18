<template>
    <div class = "barchart-wrapper">
        <h3 style="display: inline-block;">Weekly food calorie intake</h3>
        <h5 style="display: inline-block;" class = "total-num">Total intake : {{ totalCalorie }} calories</h5>
        <column-chart
            :data="calorieData"
            :library="{
                legend: { display: false },
                // maintainAspectRatio: false
            }"
            width = "560px"
            height = "330px"            
            :colors="['#628558']"
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
            calorieStats: reactive({})
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

                for (const day of daysOfWeek) {
                    this.calorieStats[day] = 0;
                }
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
        },
        totalCalorie() {
            return Object.values(this.calorieStats)
                .reduce((acc, val) => acc + val, 0);
        }
    }
}

</script>

<style scoped>

.barchart-wrapper {
    position: fixed;
    top: 120px;
    left: 760px;
    /* right: 50px; */
    width: 600px;
    height: 400px;

    font-family: 'Mulish';
    font-style: normal;
    font-size: 16px;
    color: #746652;

    background-color: #FDF9F3;
    padding: 20px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    /* border: 5px sold #628558; */
}

.total-num {
    position: relative;
    left: 240px;
    padding: 4px;
    background-color: #FFDFDD;
}

</style>
