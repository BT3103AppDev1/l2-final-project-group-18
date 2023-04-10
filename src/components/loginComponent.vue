<template>
  <div class="full-page">
    <div class="title">
      <p>Sign in / Register a FREE account</p>
    </div>

    <div class="emailInputBox">
      <input
        class="query-input"
        placeholder="Email"
        type="email"
        v-model="email"
        required
      />
    </div>

    <div class="passwordInputBox">
      <input
        class="query-input"
        placeholder="Password"
        type="password"
        v-model="password"
        required
      />
    </div>

    <div class="signInButtonBox">
      <button id="rectangle3" @click="signin()">Sign In</button>
    </div>

    <div class="newUserRegisterLink">
      <p>
        <a class="newUserRegisterLink" @click="signup"
          >New user? Register with email</a
        >
      </p>
    </div>

    <div id="firebaseui-auth-container"></div>

    <img
      src="@/assets/Skipping rope-bro.svg"
      alt="heart"
      class="icon"
      style="
        position: absolute;
        width: 500px;
        height: 500px;
        /* padding-left: 10px; */
        padding-top: 100px;
        left: 0;
      "
    />
    <img
      src="@/assets/Diet-cuate.svg"
      alt="heart"
      class="icon"
      style="
        position: absolute;
        width: 500px;
        height: 500px;
        /* padding-left: 450px; */
        padding-top: 100px;
        right: 0;
      "
    />
  </div>
</template>

<script>
import firebase from '@/uifirebase.js'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore'
import { auth, db } from '@/firebase.js'

import { ref } from 'vue'
import { async } from '@firebase/util'

export default {
  name: 'login',

  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          var user = authResult.user
          var profileInfo = {
            profile_info: {
              email: user.email,
              username: user.displayName,
              password: '',
            },
          }
          var profileDocRef = doc(db, 'users', user.uid)
          console.log(profileDocRef)
          getDoc(profileDocRef)
            .then((docSnapshot) => {
              if (docSnapshot.exists()) {
                // Redirect to homepage if user already exists in database
                window.location.href = '/goals'
              } else {
                // Redirect to welcome page if user is signing in for the first time
                setDoc(profileDocRef, profileInfo, { merge: false })
                  .then(() => {
                    window.location.href = '/welcome'
                    console.log('Profile info saved successfully')
                  })
                  .catch((error) => {
                    console.log('Error saving profile info: ', error)
                  })
              }
            })
            .catch((error) => {
              console.log('Error checking user profile: ', error)
            })
          return false
        },
      },
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },

  created() {
    const auth = getAuth()
    auth.onAuthStateChanged(async (user) => {
      console.log('Changed')
      if (user) {
        console.log(getAuth().currentUser.uid)
        // for variables being defined first time, must have 'const' or 'var'!
        const userDocRef = doc(
          getFirestore(),
          'users',
          getAuth().currentUser.uid
        )
        const lastLoginTime = new Date().toISOString()
        console.log(lastLoginTime)

        // Need to retrieve previousLogin, if today is Monday but previous is not,
        // then need to do something
        const docSnapshot = await getDoc(userDocRef)
        if (docSnapshot.data().hasOwnProperty('lastLogin')) {
          const previousLoginTime = docSnapshot.data().lastLogin

          if (previousLoginTime) {
            const previousLoginDate = new Date(previousLoginTime)
            // const dummyDate = new Date("2023-04-03T06:26:06.613Z");
            if (
              previousLoginDate.getDay() == 0 &&
              new Date(lastLoginTime).getDay() == 1
            ) {
              // if (previousLoginDate.getDay() == 0 && dummyDate.getDay() == 1) {
              // only check for the ONE special circumstance:
              // last login is Sunday, this login is Monday
              // i.e. reset respective field at first login on Monday

              const calorieStatsRef = collection(
                doc(getFirestore(), 'users', getAuth().currentUser.uid),
                'calorieStats'
              )
              console.log('Get collection')

              getDocs(calorieStatsRef).then((snapshot) => {
                snapshot
                  .forEach((doc) => {
                    updateDoc(doc.ref, { calorie: 0 })
                  })
                  .catch((error) => {
                    console.log('Error in update', error)
                  })
              })
            }
          } else {
            updateDoc(userDocRef, {
              lastLogin: new Date().toISOString(),
            })
          }
        }

        // then, update the new login time
        await setDoc(userDocRef, { lastLogin: lastLoginTime }, { merge: true })
          .then(() => {
            console.log('set')
          })
          .catch((error) => {
            console.log('Error recording login time: ', error)
          })
      }
    })
  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    signup() {
      this.$router.push('/signup')
    },

    async signin() {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, this.email, this.password)

        this.$router.push('/goals')
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          alert('Incorrect password. Please try again.')
        } else if (error.code === 'auth/user-not-found') {
          alert('Email account not registered. Please sign up a new account.')
        } else {
          console.log(error)
          this.error = error.message
        }
      }
    },
  },
}
</script>

<style scoped>
.full-page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #faf4e1;
  justify-content: space-between;
  align-items: center;
}

#firebaseui-auth-container {
  position: absolute;
  border-radius: 40px;
  width: 953.85px;
  height: 118px;
  left: 295px;
  top: 495px;
}

.title {
  position: absolute;
  width: 953.85px;
  height: 118px;
  left: 530px;

  font-family: 'Mulish';
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
  left: 15px;
}

input {
  box-sizing: border-box;

  position: absolute;
  width: 335px;
  height: 48px;
  left: 580px;
  top: 200px;

  padding-left: 20px;
  font-family: 'Mulish';
  font-size: 18px;

  border-radius: 40px;

  background: #fffefe;
  border: 1.50794px solid #000000;

  transform: matrix(1, 0, 0, 1, 0, 0);
}

.query-input::placeholder {
  text-indent: 30px;
  font-family: 'Mulish';
  font-size: 16px;
  color: #b5b7b9;
  position: relative;
  left: -15px;
}

.passwordInputBox {
  position: absolute;
  top: 70px;
  left: 15px;
}

/* signInButtonBox */
.signInButtonBox {
  position: absolute;
  width: 300.99px;
  height: 50px;
  left: 313px;
  top: 160px;

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

  font-family: 'Mulish';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  text-align: center;

  color: #33363f;

  background: #ddd8ba;
  border: 1.50794px solid #000000;
  border-radius: 150.794px;
  transform: matrix(1, 0, 0, 1, 0, 0);
}

/* New user? Register with email */
.newUserRegisterLink {
  position: absolute;
  width: 502.31px;
  height: 10px;
  left: 312px;
  top: 225px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 10px;
  text-decoration-line: underline;

  color: #0a3232;

  transform: matrix(1, 0, 0, 1, 0, 0);
}

.newUserRegisterLink:hover {
  color: #e56a48;
  cursor: pointer;
  text-decoration: underline;
}
</style>

<!-- <template>
  <div class="full-page">
    <img
      src="@/assets/Skipping rope-bro.svg"
      alt="heart"
      class="icon left"
    />
    <div class="center">
      <div class="title">
        <p>Sign in / Register a FREE account</p>
      </div>
      <div class="input-box">
        <div class="emailInputBox">
          <input
            class="query-input"
            placeholder="Email"
            type="email"
            v-model="email"
            required
          />
        </div>
        <div class="passwordInputBox">
          <input
            class="query-input"
            placeholder="Password"
            type="password"
            v-model="password"
            required
          />
        </div>
      </div>
      <div class="signInButtonBox">
        <button id="rectangle3" @click="signin()">Sign In</button>
      </div>
      <div class="newUserRegisterLink">
        <p>
          <a class="newUserRegisterLink" @click="signup">New user? Register with email</a>
        </p>
      </div>
      <div id="firebaseui-auth-container"></div>
    </div>
    <img
      src="@/assets/Diet-cuate.svg"
      alt="heart"
      class="icon right"
    />
  </div>
</template>

<script>
import firebase from '@/uifirebase.js'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore'
import { auth, db } from '@/firebase.js'

import { ref } from 'vue'
import { async } from '@firebase/util'

export default {
  name: 'login',

  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          var user = authResult.user
          var profileInfo = {
            profile_info: {
              email: user.email,
              username: user.displayName,
              password: '',
            },
          }
          var profileDocRef = doc(db, 'users', user.uid)
          console.log(profileDocRef)
          getDoc(profileDocRef)
            .then((docSnapshot) => {
              if (docSnapshot.exists()) {
                // Redirect to homepage if user already exists in database
                window.location.href = '/goals'
              } else {
                // Redirect to welcome page if user is signing in for the first time
                setDoc(profileDocRef, profileInfo, { merge: false })
                  .then(() => {
                    window.location.href = '/welcome'
                    console.log('Profile info saved successfully')
                  })
                  .catch((error) => {
                    console.log('Error saving profile info: ', error)
                  })
              }
            })
            .catch((error) => {
              console.log('Error checking user profile: ', error)
            })
          return false
        },
      },
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },

  created() {
    const auth = getAuth()
    auth.onAuthStateChanged(async (user) => {
      console.log('Changed')
      if (user) {
        console.log(getAuth().currentUser.uid)
        // for variables being defined first time, must have 'const' or 'var'!
        const userDocRef = doc(
          getFirestore(),
          'users',
          getAuth().currentUser.uid
        )
        const lastLoginTime = new Date().toISOString()
        console.log(lastLoginTime)

        // Need to retrieve previousLogin, if today is Monday but previous is not,
        // then need to do something
        const docSnapshot = await getDoc(userDocRef)
        if (docSnapshot.data().hasOwnProperty('lastLogin')) {
          const previousLoginTime = docSnapshot.data().lastLogin

          if (previousLoginTime) {
            const previousLoginDate = new Date(previousLoginTime)
            // const dummyDate = new Date("2023-04-03T06:26:06.613Z");
            if (
              previousLoginDate.getDay() == 0 &&
              new Date(lastLoginTime).getDay() == 1
            ) {
              // if (previousLoginDate.getDay() == 0 && dummyDate.getDay() == 1) {
              // only check for the ONE special circumstance:
              // last login is Sunday, this login is Monday
              // i.e. reset respective field at first login on Monday

              const calorieStatsRef = collection(
                doc(getFirestore(), 'users', getAuth().currentUser.uid),
                'calorieStats'
              )
              console.log('Get collection')

              getDocs(calorieStatsRef).then((snapshot) => {
                snapshot
                  .forEach((doc) => {
                    updateDoc(doc.ref, { calorie: 0 })
                  })
                  .catch((error) => {
                    console.log('Error in update', error)
                  })
              })
            }
          } else {
            updateDoc(userDocRef, {
              lastLogin: new Date().toISOString(),
            })
          }
        }

        // then, update the new login time
        await setDoc(userDocRef, { lastLogin: lastLoginTime }, { merge: true })
          .then(() => {
            console.log('set')
          })
          .catch((error) => {
            console.log('Error recording login time: ', error)
          })
      }
    })
  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    signup() {
      this.$router.push('/signup')
    },

    async signin() {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, this.email, this.password)

        this.$router.push('/goals')
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          alert('Incorrect password. Please try again.')
        } else if (error.code === 'auth/user-not-found') {
          alert('Email account not registered. Please sign up a new account.')
        } else {
          console.log(error)
          this.error = error.message
        }
      }
    },
  },
}
</script>

<style scoped>
.full-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
  margin-bottom: 1rem;
}

.input-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.query-input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid gray;
  width: 20rem;
  max-width: 100%;
  font-size: 1rem;
}

.signInButtonBox {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

#rectangle3 {
  background-color: #2c3e50;
  border-radius: 20px;
  width: 200px;
  height: 40px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

#rectangle3:hover {
  background-color: #34495e;
}

.newUserRegisterLink {
  margin-top: 1rem;
  text-align: center;
}

.icon {
  width: 300px;
  height: 300px;
}

.left {
  position: absolute;
  left: 0;
}

.right {
  position: absolute;
  right: 0;
}
</style> -->
