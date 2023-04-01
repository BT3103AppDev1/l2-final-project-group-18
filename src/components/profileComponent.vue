<template>
    <div class="title">
        <p>{{ greeting }}</p>
    </div>

    <div class = "container">
        <div id = "weight-height-card"></div>
        <div id = "exercise-card"></div>
        <div id = "BMI-card"></div>
        <div id = "calories-card"></div>
    </div>

    <div class = "button">
            <button id = "btn" @click = "updateProfile">Update Profile Info</button>          
    </div>
    <img class = "image" src="../assets/profile_page.png" alt="image here">
</template>

<script>
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase.js';
import { onAuthStateChanged } from 'firebase/auth'

export default {
    name: "profile",
    
    data() {
        return {
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
        updateProfile() {
            this.$router.push('/updateProfile');
        }
    },
}
</script>


<style scoped>
.title {
    position: absolute;
    width: 953.85px;
    height: 118px;
    left: 200px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 35px;
    line-height: 36px;

    color: #061428;

    transform: rotate(0.07deg);
}

.container {
    position: absolute;
    display: flex;
}

.button {
    position: absolute;
    width: 400px;
    height: 80px;
    left: 1200px;
    top: 200px;
}

.button #btn {
    box-sizing: border-box;

    position: absolute;
    width: 220px;
    height: 60px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 29px;
    text-align: center;

    color: #000000;
    background: #DDD8BA;
    border: 1.5px solid #000000;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
    border-radius: 31.5px;
    box-sizing: border-box;
    transform: matrix(1, 0, 0, 1, 0, 0);
}
.container #exercise-card {
    position: absolute;
    width: 317.2px;
    height: 262px;
    left: 587.55px;
    top: 165.12px;

    background: #7042C9;
    opacity: 0.1;
    border-radius: 40px;
    transform: rotate(0.34deg);
}

.container #weight-height-card {
    position: absolute;
    width: 317.2px;
    height: 259.03px;
    left: 232px;
    top: 163.12px;

    background: #D2416E;
    opacity: 0.1;
    border-radius: 40px;
    transform: rotate(0.34deg);
}

.container #BMI-card {
    position: absolute;
    width: 317.2px;
    height: 262px;
    left: 227.55px;
    top: 453.12px;

    background: #0DB1AD;
    opacity: 0.1;
    border-radius: 40px;
    transform: rotate(0.34deg);
}

.container #calories-card {
    position: absolute;
    width: 317.2px;
    height: 262px;
    left: 585.55px;
    top: 451.12px;

    background: rgba(25, 123, 210, 0.1);
    border-radius: 40px;
    transform: rotate(0.34deg);
}

.image {
    display: block;
    /* width: 220px;
    height: 330px; */
    position: absolute;
    top: 300px;
    left: 1100px;
}
</style>