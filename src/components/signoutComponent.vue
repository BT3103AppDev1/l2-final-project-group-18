<template>
    <div class = "signOutButtonBox">
            <button id = "rectangle3" @click = "signOut">Sign Out</button>          
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from '@/firebase.js';
export default {
    name: "signout",
    mounted() {
    //const auth = getAuth();
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

  // data() {
  //   return {
  //     user: null,
  //   };
  // },
  
  methods: {
    async signOut() {
      try {
        await signOut(auth);
        console.log("signed out successfully");
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<style scoped>
.signOutButtonBox {
    position: absolute;
    width: 644.99px;
    height: 82.92px;
    left: 343.92px;
    top: 200px;
}



/* Rectangle 3 for sign in button */
.signOutButtonBox #rectangle3 {
    box-sizing: border-box;

    position: absolute;
    width: 300px;
    height: 50px;
    left: 344px;
    top: 200px;

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