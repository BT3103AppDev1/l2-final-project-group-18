<template>
   
    <div class = "cardUpdateExercise">

        <div class = "section">
            <div id = "left-elem">
                <p>{{ goalTitleUE }}</p>
            </div>
            <div id = "right-elem">
                <button @click="($event) => (showPopUp5 = true)" id = "updateExerciseButton">UPDATE</button>
            </div>
        </div>

        <div class = "divider"></div>

        <div class = "section">
            <div id = "circle"></div>
            <div id = "no-goals-elem">
                <p>I want to exercise {{ targetMin }} minutes every week.</p>
            </div>
            <div id = "seeExerciseProgress">
                <router-link to = "/exercise">
                    <button id = "seeExerciseProgressButton">SEE PROGRESS</button>
                </router-link>
            </div>
        </div>

        <div v-if="showPopUp5" class="overlay">
            <UpdateExercisePopUp :showPopUp5="showPopUp5" @close="($event) => (showPopUp5 = false)"/>
        </div>

    </div>


</template>

<script>
import UpdateExercisePopUp from './UpdateExercisePopUp.vue'
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
    name: "cardUpdateExerciseGoal",
    components: {
        UpdateExercisePopUp,
    },
    data() {
        return {
            showPopUp5: false,
            targetMin: 0,
        };
    },
    props: {
        goalTitleUE: {
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
        this.fetchExerciseGoal()
    },
    methods: {
        async fetchExerciseGoal() {
            const userRef = doc(db, 'users', 'UZwy1hqjve1VIUsgIrhy')
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoSnapshot = await getDoc(doc(goalInfoCollection, 'weeklyExercise'))
            
            this.targetMin = goalInfoSnapshot.data().targetMin;
        },
    }
}
</script>


<style>
/* cards / default */
.cardUpdateExercise {
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
#updateExerciseButton {
    background-color: #FCB64E;
    width: 80px;
    height: 24px;
    border-radius: 8px;
    border: 0;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25)
}

#updateExerciseButton:active {
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

#seeExerciseProgress {
    padding-top: 11px;
    width: 50%;
    padding-right: 40px;
}

#seeExerciseProgressButton {
    background-color: #869F77;
    width: 140px;
    height: 24px;
    border-radius: 8px;
    float: right;
    border: 0;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25)
}

#seeExerciseProgressButton:active {
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