<template>
            <div class = "title">
            <p>Register a FREE account</p>
        </div>

        <div class = "userNameBox">
            <input class = "query-input" placeholder="Username" type="username" v-model="username">
        </div>

        <div class = "emailInputBox">
            <input class = "query-input" placeholder="Email" type="email" v-model="email">
        </div>

        <div class = "passwordInputBox">
            <input class = "query-input" placeholder="Password" type="password" v-model="password">
        </div>

        <div class = "registerButtonBox">
            <button id = "rectangle3" @click = "register()">Register</button>
            
        </div>

        <div class = "loginLink">
            <p><a class = "loginLink" @click = "login">Already have an account? Sign in</a></p>
        </div>
</template>

<script>
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { auth, db } from '@/firebase.js';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        const profileDocRef = doc(db, "users", user.uid);
        const profileData = {
          email: this.email,
          password: this.password,
          username: this.username,
        };
        await setDoc(profileDocRef, { profile_info: profileData });
        console.log('User signed up successfully!');
        this.$router.push('/login')
      } catch (error) {
        console.error(error);
      }
    },

    login() {
        this.$router.push('/login')
    }
  },
};
</script>

<style scoped>
/* register a free account*/
.title  {
    position: absolute;
    width: 953.85px;
    height: 118px;
    left: 600px;
    /* top: 79px; */

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;

    color: #061428;

    transform: rotate(0.07deg);
}

.userNameBox {
    position: absolute;
    top: -50px;
    left: 20px;

}

.emailInputBox {
    position: absolute;
    top: 10px;
    left: 20px;
}

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
    
    transform: matrix(1, 0, 0, 1, 0, 0);
}

.query-input::placeholder {
    text-indent: 30px;
    font-family: 'Mulish';
    font-size: 16px;
    color: #B5B7B9;
}

.passwordInputBox {
    position: absolute;
    top: 70px;
    left: 20px;
}
.registerButtonBox {
    position: absolute;
    width: 300.99px;
    height: 50px;
    left: 370px;
    top: 200px;

    transform: rotate(-0.27deg);
}

.registerButtonBox #rectangle3 {
    box-sizing: border-box;

    position: absolute;
    width: 300px;
    height: 50px;
    left: 270px;
    top: 220px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
    text-align: center;

    color: #33363F;

    background: #DDD8BA;
    border: 1.50794px solid #000000;
    border-radius: 150.794px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}



/* Already have an account? Sign in */
.loginLink {
    position: absolute;
    width: 502.31px;
    height: 10px;
    left: 320px;
    top: 275px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 10px;
    text-decoration-line: underline;

    color: #0A3232;

    transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>