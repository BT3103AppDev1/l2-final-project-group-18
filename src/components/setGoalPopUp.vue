<template>
    <div v-if = "showPopUp1" class = "setGoal">

        <div class = "topRow">
            <div id = "right-elem">
                <button @click = "closePopUp" class = "close-icon">x</button>
            </div>
        </div>

        <div id = "title">
            <h1>Set Goal</h1>
        </div>
        
        <div class = "allrows">
            <div class = "secondRow">
                <div class = "left-text">
                    <label>Weight gain/ weight loss:</label>
                </div>
                <div class = "right-input">
                    <select class="drop-down-list" v-model="weightGainOrLoss">
                        <option value="" disabled selected>Select weight goal</option>
                        <option value = "Weight Gain">Weight Gain</option>
                        <option value = "Weight Loss">Weight Loss</option>
                    </select>
                    <!--<input type="text" name="wgl" placeholder="Weight Goal">-->
                </div>
            </div>

            <div class = "thirdRow">
                <div class = "left-text2">
                    <label>Amount of kg to gain / lose:</label>
                </div>
                <div class = "middle-input">
                    <input type="number" v-model="weightChangeInKg" placeholder=0 min = 0>
                </div>
                <div class = "right-text">
                    <p>kg</p>
                </div>
            </div>

            <div class = "thirdRow">
                <div class = "left-text2">
                    <label>Days to achieve the goal:</label>
                </div>
                <div class = "middle-input3">
                    <input type="number" v-model="daysToCompleteGoal" placeholder=0 min = 0>
                </div>
                <div class = "right-text">
                    <p>days</p>
                </div>
            </div>

        </div>
        <button id = "button" @click="addGoal">SET</button>

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

const db = getFirestore(firebaseApp)

export default {
    name: 'SetGoalPopUp',
    props: {
        showPopUp1: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            weightGainOrLoss: '',
            weightChangeInKg: 0,
            daysToCompleteGoal: 0
        };
    },
    methods: {
        closePopUp() {
            this.$emit('close')
        },

        async addGoal() {
            if (!this.weightGainOrLoss || !this.weightChangeInKg || !this.daysToCompleteGoal) {
                alert('Please fill in weight goal information for all 3 fields.')
                return
            } 

            const userRef = doc(db, 'users', 'UZwy1hqjve1VIUsgIrhy')
            const goalInfoCollection = collection(userRef, 'goalInfo')
            const goalInfoDoc = doc(goalInfoCollection, 'weightGoals')

            const docRef = await setDoc(goalInfoDoc, {
                daysToCompleteGoal: this.daysToCompleteGoal,
                weightChangeInKg: this.weightChangeInKg,
                weightGainOrLoss: this.weightGainOrLoss,
            })
            this.closePopUp()
            location.reload()
        }

    }
}
</script>

<style scoped>
.setGoal {
    position: fixed;
    width: 700px;
    height: 500px;
    background-color: #FAF4E1;
    border: 5px solid #9F978B;
    border-radius: 20px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: #FAF4E1;
  border: 0px;
}

.close-icon:hover {
    color: #9F978B;
}


.topRow {
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

#right-elem {
    padding-top: 11px;
    color: #746652;
}

.allrows {
    width: 100%;
    font-family: 'Mulish', sans-serif;
    padding-top: 10px;
}

.secondRow {
    width: 100%;
    display: flex;
    font-family: 'Mulish', sans-serif;
    padding-top: 10px;

}

.left-text {
    padding-left: 8%;
    font-weight: 50;
    font-size: 20px;
    padding-top: 5px;
}

.drop-down-list {
    position: relative;
    box-sizing: border-box;
    flex: 0.67;
    width: 200px;
    height: 40px;
    margin-left: 50px;
    padding-left: 20%;
    padding-top: 15%;
    background: #DDD8BA;
    border: 1px solid #c1c1c1;
    border-radius: 20px;
    font-weight: 50;
    font-size: 20px;
    font-family: 'Mulish', sans-serif;

}

.thirdRow {
    width: 100%;
    display: flex;
    font-family: 'Mulish', sans-serif;
    padding-top: 10px;
    align-items: center;

}

.left-text2 {
    padding-left: 8%;
    font-weight: 50;
    font-size: 20px;
    padding-top: 5px;
}

.middle-input {
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

.right-text {
    margin-left: 20px;
    font-weight: 50;
    font-size: 20px;
}
.middle-input3{
    margin-left: 42px;
}

#button {
    background-color: #FCB64E;
    width: 200px;
    height: 50px;
    border-radius: 8px;
    font-size: 20px;
    margin-top: 50px;
}
</style>

