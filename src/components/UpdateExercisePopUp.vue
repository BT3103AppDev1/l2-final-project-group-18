<template>
    <div v-if = "showPopUp5" class = "updateExerciseGoal">

        <div class = "topExerciseRow">
            <div id = "right-elem-e">
                <button @click = "closePopUp5" class = "close-icon-e">x</button>
            </div>
        </div>

        <div id = "title">
            <h1>Update Goal</h1>
        </div>
        
        <div class = "allExerciseRows">

            <div class = "thirdExerciseRow">
                <div class = "left-text2-e">
                    <label>Weekly exercise target:</label>
                </div>
                <div class = "middle-input-e">
                    <input type="number" v-model="targetMin" placeholder=0 min = 0>
                </div>
                <div class = "right-text-e">
                    <p>min</p>
                </div>
            </div>

        </div>
        <button id = "updateExerciseGoalButton" @click="updateExerciseGoalClick">UPDATE</button>

    </div>
</template>

<script>
import firebaseApp from '../firebase.js'
import {
  collection,
  doc,
  setDoc,
  getFirestore,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
    name: 'UpdateExercisePopUp',
    props: {
        showPopUp5: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            targetMin: 0,
            userID: '',
        };
    },
    created() {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.userID = user.uid
        }
        })
    },
    methods: {
        closePopUp5() {
            this.$emit('close')
        },

        async updateExerciseGoalClick() {
            if (!this.targetMin) {
                alert('Please fill in the weekly exercise target you want to update to and check the data you are keying in is of the correct type.')
                return
            } 

            const userRef = doc(db, 'users', this.userID)
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoDoc = doc(goalInfoCollection, 'weeklyExercise')

            const docRef = await setDoc(goalInfoDoc, {
                targetMin: this.targetMin
            })
            this.closePopUp5()
            location.reload()
        },

    }
}
</script>

<style scoped>
.updateExerciseGoal {
    position: fixed;
    width: 700px;
    height: 350px;
    background-color: #FAF4E1;
    border: 5px solid #9F978B;
    border-radius: 20px;
}

.close-icon-e {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: #FAF4E1;
  border: 0px;
}

.close-icon-e:hover {
    color: #9F978B;
}


.topExerciseRow {
    width: 100%;
    display: flex;

}

#title {
    color: #000;
    font-weight: 700;
    font-size: 30px;
    line-height: 22px;
    flex: 0.5;/* or 46% */
    text-align: center;
    font-family: 'Mulish', sans-serif;
}

#right-elem-e {
    padding-top: 11px;
    color: #746652;
}

.allExerciseRows {
    width: 100%;
    font-family: 'Mulish', sans-serif;
    padding-top: 10px;
}


.thirdExerciseRow {
    width: 100%;
    display: flex;
    font-family: 'Mulish', sans-serif;
    padding-top: 10px;
    align-items: center;

}

.left-text2-e {
    padding-left: 8%;
    font-weight: 50;
    font-size: 20px;
    padding-top: 5px;
}

.middle-input-e {
    margin-left: 25px;
}

input {
    border: 1px solid #c1c1c1;
    background: #DDD8BA;
    border-radius: 5px;
    font-weight: 50;
    font-size: 20px;
    font-family: 'Mulish', sans-serif;
    height: 40px;
    width: 200px;
    box-shadow: 2px 2px 4px #c1c1c1;

}

.right-text-e {
    margin-left: 20px;
    font-weight: 50;
    font-size: 20px;
}

#updateExerciseGoalButton {
    background-color: #FCB64E;
    width: 200px;
    height: 50px;
    border-radius: 8px;
    font-size: 20px;
    margin-top: 50px;
}
</style>

