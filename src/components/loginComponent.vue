<template>
        <div class="title">
        <p>Sign in / Register a FREE account</p>
        </div>

        <div class = "emailInputBox">
            <input class = "query-input" placeholder="Email" type="email" v-model="email" required>
        </div>

        <div class = "passwordInputBox">
            <input class = "query-input" placeholder="Password" type="password" v-model="password" required>
        </div>

        <div class = "signInButtonBox">
            <button id = "rectangle3" @click = "signin()">Sign In</button>
        </div>

        <div class = "newUserRegisterLink">
            <p><a class = "newUserRegisterLink" @click = "signup">New user? Register with email</a></p>
        </div>

        <div id = "firebaseui-auth-container"></div>
</template>

<script>
import firebase from '@/uifirebase.js';
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
    name: "login",
  
    mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
    };
    ui.start("#firebaseui-auth-container", uiConfig)
  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    signup() {
      this.$router.push('/signup')
    },
    
    async signin() {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        this.error = error.message;
      }
    },
  },

}
</script>

<style scoped>
#firebaseui-auth-container {
    position: absolute;
    border-radius: 40px;
    width: 953.85px;
    height: 118px;
    left: 330px;
    top: 560px;
}

.title {
    position: absolute;
    width: 953.85px;
    height: 118px;
    left: 550px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;

    color: #061428;

    transform: rotate(0.07deg);
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



/* signInButtonBox */
.signInButtonBox {
    position: absolute;
    width: 300.99px;
    height: 50px;
    left: 370px;
    top: 200px;

    transform: rotate(-0.27deg);
}

/* Rectangle 3 for sign in button */
.signInButtonBox #rectangle3 {
    box-sizing: border-box;

    position: absolute;
    width: 300px;
    height: 50px;
    left: 300px;
    top: 200px;

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


/* New user? Register with email */
.newUserRegisterLink {
    position: absolute;
    width: 502.31px;
    height: 10px;
    left: 340px;
    top: 250px;

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