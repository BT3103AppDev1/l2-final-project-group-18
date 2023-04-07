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
import { collection, doc, setDoc, getDocs, getFirestore, writeBatch, query, where } from "firebase/firestore";
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
      // check if user has put in all required fields
      if (!this.username || !this.email || !this.password) {
        alert('Please fill in all the required fields.');
        return;
      }

      // check if password is too weak
      if (this.password.length < 6) {
        alert('Please set a strong password with at least 6 characters.');
        return;
      }

      // check if username already exists
      const usersRef = collection(db, "users");
      const usernameQuery = query(usersRef, where("profile_info.username", "==", this.username));
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        alert("Username already exists. Please choose a different username.");
        return;
      }

      // check if email already exists
      const emailQuery = query(usersRef, where("profile_info.email", "==", this.email));
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        alert("Email already exists. Please use a different email.");
        return;
      }

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

        const calorieStatsRef = 
          collection(doc(getFirestore(), "users", user.uid), "calorieStats");
        console.log("This step is finished");
        getDocs(calorieStatsRef).then((snapshot) => {
          if (snapshot.size > 0) {
            console.log("calorieStats already exists");
          } else {
            console.log("calorieStats collection does not exist");

            const batch = writeBatch(db);
            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            daysOfWeek.forEach((day) => {
              const docRef = doc(calorieStatsRef, day);
              batch.set(docRef, { calorie: 0 });
            });

            batch.commit().then(() => {
              console.log("calorieStats collection and documents created successfully");
            }).catch((error) => {
              console.log("Error creating calorieStats collection and documents:", error);
            });   
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });

        // const sportStatsRef = collection(doc(getFirestore(), "users", user.uid), "sportStats");
        // const dummyDocRef = doc(sportStatsRef, "dummy")
        // await setDoc(dummyDocRef, {
        //   caloriesBurntPerMinute: 0,
        // })
         

        this.$router.push('/welcome')
      } catch (error) {
        console.error(error);
      }
    },

    login() {
        this.$router.push('/')
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

    font-family: 'Mulish';
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
    left: 580px;
    top: 200px;

    padding-left: 20px;
    font-family: 'Mulish';
    font-size: 18px;

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

    position: relative;
    left: -15px;
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
    left: 340px;
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

    font-family: 'Mulish';
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
    left: 310px;
    top: 275px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 10px;
    text-decoration-line: underline;

    color: #0A3232;

    transform: matrix(1, 0, 0, 1, 0, 0);
}

.loginLink:hover {
  color: #E56A48;
  cursor: pointer;
  text-decoration: underline;
}

</style>