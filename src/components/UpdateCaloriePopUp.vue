<template>
    <div v-if = "showPopUp4" class = "updateCalorieGoal">

        <div class = "topCalorieRow">
            <div id = "right-elem-c">
                <button @click = "closePopUp4" class = "close-icon-c">x</button>
            </div>
        </div>

        <div id = "title">
            <h1>Update Goal</h1>
        </div>
        
        <div class = "allCalorieRows">

            <div class = "thirdCalorieRow">
                <div class = "left-text2-c">
                    <label>Daily calorie intake target:</label>
                </div>
                <div class = "middle-input-c">
                    <input type="number" v-model="targetCalorie" placeholder=0 min = 0>
                </div>
                <div class = "right-text-c">
                    <p>calories</p>
                </div>
            </div>

        </div>
        <button id = "updateCalorieGoalButton" @click="updateCalorieGoalClick">UPDATE</button>

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
    name: 'UpdateCaloriePopUp',
    props: {
        showPopUp4: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            targetCalorie: 0,
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
        closePopUp4() {
            this.$emit('close')
        },

        async updateCalorieGoalClick() {
            if (!this.targetCalorie) {
                alert('Please fill in the daily calorie intake target you want to update to and check the data you are keying in is of the correct type.')
                return
            } 

            const userRef = doc(db, 'users', this.userID)
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoDoc = doc(goalInfoCollection, 'dailyCalorie')

            const docRef = await setDoc(goalInfoDoc, {
                targetCalorie: this.targetCalorie
            })
            this.closePopUp4()
            location.reload()
        },

    }
}
</script>

<style scoped>
.updateCalorieGoal {
    position: fixed;
    width: 700px;
    height: 350px;
    background-color: #FAF4E1;
    border: 5px solid #9F978B;
    border-radius: 20px;
}

.close-icon-c {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: #FAF4E1;
  border: 0px;
}

.close-icon-c:hover {
    color: #9F978B;
}


.topCalorieRow {
    width: 100%;
    display: flex;

}

#title {
    color: #000;
    font-weight: 700;
    font-size: 30px;
    line-height: 22px;
    font-size: 19px;
    flex: 0.5;/* or 46% */
    text-align: center;
    font-family: 'Mulish', sans-serif;
}

#right-elem-c {
    padding-top: 11px;
    color: #746652;
}

.allCalorieRows {
    width: 100%;
    font-family: 'Mulish', sans-serif;
    padding-top: 10px;
}


.thirdCalorieRow {
    width: 100%;
    display: flex;
    font-family: 'Mulish', sans-serif;
    padding-top: 10px;
    align-items: center;

}

.left-text2-c {
    padding-left: 12%;
    font-weight: 50;
    font-size: 20px;
    padding-top: 5px;
}

.middle-input-c {
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

.right-text-c {
    margin-left: 20px;
    font-weight: 50;
    font-size: 20px;
}

#updateCalorieGoalButton {
    background-color: #FCB64E;
    width: 200px;
    height: 50px;
    border-radius: 8px;
    font-size: 20px;
    margin-top: 50px;
}
</style>

