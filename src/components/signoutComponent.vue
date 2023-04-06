<template>
  <div class="title">
    <p>Are you sure to sign out?</p>
  </div>
  <div class="container">
    <div class = "signOutButtonBox">
            <button id = "rectangle3" @click = "signOut">Sign Out</button>          
    </div>
    <div class = "cancel">
            <button id = "cancelBtn" @click = "cancel">Cancel</button>          
    </div>
  </div>
  <img src="@/assets/signout_thinking.svg" alt="heart" class="icon" style="width: 500px; height: 500px; padding-left: 500px; padding-top: 100px;"/>
    
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from '@/firebase.js';
export default {
    name: "signout",
    mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    })
  },
  data() {
    return {
      user: false,
    }
  },
  
  methods: {
    async signOut() {
      try {
        await signOut(auth);
        console.log("signed out successfully");
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },

    cancel() {
      this.$router.push('/home');
    }
  },
}
</script>

<style scoped>
.title {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 20px;
  text-align: center;
  top: 50px;
}

.container {
  display: flex;
  position: absolute;
  top: 200px;
  left: 290px;
}

.signOutButtonBox {
    /* position: absolute; */
    width: 644.99px;
    height: 82.92px;
    /* left: 343.92px;
    top: 200px; */
}

.signOutButtonBox #rectangle3 {
    box-sizing: border-box;

    /* position: absolute; */
    width: 300px;
    height: 50px;
    /* left: 344px;
    top: 200px; */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 20px;
    text-align: center;

    color: #33363F;

    background: #DDD8BA;
    border: 1.50794px solid #000000;
    border-radius: 150.794px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}

.cancel {
    /* position: absolute; */
    width: 644.99px;
    height: 82.92px;
    /* left: 343.92px;
    top: 200px; */
}

.cancel #cancelBtn {
    box-sizing: border-box;

    /* position: absolute; */
    width: 300px;
    height: 50px;
    /* left: 344px;
    top: 200px; */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 20px;
    text-align: center;

    color: #33363F;

    background: #DDD8BA;
    border: 1.50794px solid #000000;
    border-radius: 150.794px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>