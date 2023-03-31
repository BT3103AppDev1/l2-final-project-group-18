<template>
   
    <div class = "cardUpdateCalorie">

        <div class = "section">
            <div id = "left-elem">
                <p>{{ goalTitleUC }}</p>
            </div>
            <div id = "right-elem">
                <button @click="($event) => (showPopUp4 = true)" id = "updateCalorieButton">UPDATE</button>
            </div>
        </div>

        <div class = "divider"></div>

        <div class = "section">
            <div id = "circle"></div>
            <div id = "no-goals-elem">
                <p>I want to take in {{ targetCalorie }} calories every day.</p>
            </div>
            <div id = "seeCalorieProgress">
                <router-link to = "/food"><button id = "seeCalorieProgressButton">
                    SEE PROGRESS
                </button></router-link>
            </div>
        </div>

        <div v-if="showPopUp4" class="overlay">
            <UpdateCaloriePopUp :showPopUp4="showPopUp4" @close="($event) => (showPopUp4 = false)"/>
        </div>

    </div>


</template>

<script>
import UpdateCaloriePopUp from './UpdateCaloriePopUp.vue'
import firebaseApp from '../firebase.js'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
    name: "cardUpdateCalorieGoal",
    components: {
        UpdateCaloriePopUp,
    },
    data() {
        return {
            showPopUp4: false,
            targetCalorie: 0,
        };
    },
    props: {
        goalTitleUC: {
            type: String,
            required: true,
        },
    },
    mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user
        }
        })
        this.fetchCalorieGoal()
    },
    methods: {
        async fetchCalorieGoal() {
            const userRef = doc(db, 'users', 'UZwy1hqjve1VIUsgIrhy')
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoSnapshot = await getDoc(doc(goalInfoCollection, 'dailyCalorie'))
            
            this.targetCalorie = goalInfoSnapshot.data().targetCalorie;
        },
    }
}
</script>


<style>
/* cards / default */
.cardUpdateCalorie {
    position: absolute;
    left: 40px;
    top: 110px;
    width: 900px;
    height: 116px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid #DFE0EB;
}
.section {
    display: flex;
    font-family: 'Mulish', sans-serif;
    padding-left: 20px;
    padding-bottom: 5px;
    padding-top: 5px;
    
}
#left-elem {
    color: #C5C7CD;
    flex: 0.95;
}
#right-elem {
    padding-top: 11px;
    color: #746652;
}
#updateCalorieButton {
    background-color: #FCB64E;
    width: 80px;
    height: 24px;
    border-radius: 8px;
    border: 0;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25)
}

#updateCalorieButton:active {
    color: #fff;
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
    width: 50%;

}

#seeCalorieProgress {
    padding-top: 11px;
    width: 50%;
    padding-right: 40px;
}


#seeCalorieProgressButton {
    background-color: #869F77;
    width: 140px;
    height: 24px;
    border-radius: 8px;
    float: right;
    border: 0;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25)
}

#seeCalorieProgressButton:active {
    color: #fff;
}


.overlay {
    position: fixed;
    top: 13%;
    left: 30%;
    z-index: 9999;
    text-align: center;
    width: 700px;
    height: 300px;
}
</style>