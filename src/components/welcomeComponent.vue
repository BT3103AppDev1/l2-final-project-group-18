<template>
  <div class="title">
      <p>{{ greeting }}</p>
      <p>Welcome to your personal health tracker</p>
  </div>

  <div class="subtitle">
      <p>Give us some basic information to get started</p>
  </div>

  <div>
  <div class="gender-selection">
    <div class="gender-option" :class="{ active: gender === 'male' }" @click="gender = 'male'">
      <img src="../assets/male_icon.png">
      <p>Male</p>
    </div>
    <div class="gender-option" :class="{ active: gender === 'female' }" @click="gender = 'female'">
      <img src="../assets/female_icon.png" >
      <p>Female</p>
    </div>
  </div>
</div>

  <div class="container1">
      <p id="height-label">Height:</p>
      <div class = "height-field">
          <input class = "query-input" placeholder="Height" type="number" v-model="height" required>
      </div>
      <p id="height-unit">cm</p>
  </div>

  <div class="container2">
      <p id="weight-label">Weight:</p>
      <div class = "weight-field">
          <input class = "query-input" placeholder="Weight" type="number" v-model="weight" required>
      </div>
      <p id="weight-unit">kg</p>
  </div>

  <div class = "confirm-button-wrapper">
          <button id = "confirm-button" @click = "saveProfile">Confirm</button>
  </div>
  <img class = "image" src="../assets/welcome.png" alt="image here">
  
  
</template>


<script>
import { doc, setDoc, getDoc, getFirestore, collection, getDocs, writeBatch  } from 'firebase/firestore'
import { auth, db } from '@/firebase.js';
import { onAuthStateChanged, getAuth } from 'firebase/auth'

export default {
  name: "welcomeComponent",
  data() {
  return {
    gender: null,
    height: null,
    weight: null,
    username: null,
    uid: null
  }
},
mounted() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const profileDocRef = doc(db, 'users', user.uid);
      getDoc(profileDocRef).then((profileDoc) => {
        if (profileDoc.exists()) {
          const profileData = profileDoc.data();
          if (profileData.profile_info) {
            this.username = profileData.profile_info.username;
            this.uid = user.uid;
          }
        }
      });
    }
  });
},
computed: {
  greeting() {
    if (this.username) {
      return `Hello, ${this.username}!`;
    } else {
      return 'Loading...';
    }
  },
},

methods: {
  async saveProfile() {
    // Check if all input fields are filled
    if (!this.gender || !this.height || !this.weight) {
      alert('Please fill in your gender, height and weight.');
      return;
    }
    const profileDocRef = doc(db, 'users', this.uid);
    const data = {       
      healthStats: {
        gender: this.gender,
        height: this.height,
        weight: this.weight,
      }
    };
    await setDoc(profileDocRef, data, { merge: true });
    alert('Profile saved successfully!');
    this.$router.push('/profile');
  }
}
};
</script>


<style scoped>
input {
  box-sizing: border-box;
  position: absolute;
  width: 335px;
  height: 48px;
  left: 650px;
  top: 200px;
  border-radius: 40px;
  background: #FFFEFE;
  border: 1.50794px solid #000000;

  padding-left: 20px;
  font-family: 'Mulish';
  font-size: 18px;
  
  transform: matrix(1, 0, 0, 1, 0, 0);
}
.query-input::placeholder {
  text-indent: 30px;
  font-family: 'Mulish';
  font-size: 16px;
  color: #B5B7B9;

  position: relative;
  left: -15px;
}
.image {
  display: block;
  width: 220px;
  height: 330px;
  position: absolute;
  top: 300px;
  left: 400px;
}
.title {
  position: absolute;
  width: 953.85px;
  height: 118px;
  left: 300px;
  /* top: 79px; */
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #061428;
  transform: rotate(0.07deg);
}
.subtitle {
  /* Give us some basic information to get started */
  position: absolute;
  width: 736.17px;
  height: 42px;
  left: 300px;
  top: 150px;
  font-family: 'Mulish', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 10px;
  /* identical to box height */
  /* bl */
  color: #061428;
  transform: rotate(0.04deg);
}
.container1 {
  display: flex;
}
.container2 {
  display: flex;
}
.height-field {
  position: absolute;
  top: 200px;
  left: 240px;
}
#height-label {
  position: absolute;
  width: 149px;
  height: 41px;
  left: 750px;
  top: 370px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 20px;
  /* or 63% */
  display: flex;
  align-items: center;
  color: #A88151;
}
#weight-label {
  position: absolute;
  width: 149px;
  height: 41px;
  left: 750px;
  top: 450px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 20px;
  /* or 63% */
  display: flex;
  align-items: center;
  color: #A88151;
}
#height-unit {
  position: absolute;
  width: 149px;
  height: 41px;
  left: 1250px;
  top: 370px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 20px;
  /* or 63% */
  display: flex;
  align-items: center;
  color: #A88151;
}
#weight-unit {
  position: absolute;
  width: 149px;
  height: 41px;
  left: 1250px;
  top: 450px;
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 20px;
  /* or 63% */
  display: flex;
  align-items: center;
  color: #A88151;
}
.height-field #height {
  position: absolute;
  top: -5px;
  left: 40px;
  font-family: 'Mulish';
  font-style: normal;
  font-size: 18px;
  color: #B5B7B9;
  text-align: center;
}
.weight-field {
  position: absolute;
  top: 280px;
  left: 240px;
}
.weight-field #weight {
  position: absolute;
  top: -5px;
  left: 40px;
  font-family: 'Mulish';
  font-style: normal;
  font-size: 18px;
  color: #B5B7B9;
  text-align: center;
}
.confirm-button-wrapper {
  position: absolute;
  left: 1000px;
  top: 580px;
  width: 700px;
  height: 50px;
}
.confirm-button-wrapper #confirm-button {
  width: 168.3px;
  height: 44.59px;
  
  font-family: 'Mulish';
  font-style: normal;
  font-size: 20px;
  text-align: center;
  color: #746652;
  background: #DDD8BA;
  border-radius: 30px;
}

.confirm-button-wrapper #confirm-button:hover {
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}


.gender-selection {
display: flex;
justify-content: center;
align-items: center;
height: 20%;
position: absolute;
right: 180px;
top: 200px;
}
.gender-option {
margin-right: 15px;
cursor: pointer;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
img {
  height: 150px;
  width: 150px;
}
.gender-option.active img {
  border: 10px solid #DDD8BA;
  box-shadow: 0px 0px 20px #DDD8BA;
  border-radius: 20px;
}
</style>