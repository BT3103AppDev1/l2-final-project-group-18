<template>
    <div class = "button">
            <button id = "btn" @click = "updateProfile">Update Profile Info</button>          
    </div>

</template>

<script>
import { auth } from '@/firebase.js';
export default {
    name: "profile",
    
    data() {
        return {
        
        }
    },
  
    methods: {
        updateProfile() {
            this.$router.push('/updateProfile');
        }
    },
}
</script>


<style scoped>
.button {
    position: absolute;
    width: 288px;
    height: 61.5px;
    left: 1200px;
    top: 200px;
}



/* Rectangle 3 for sign in button */
.button #btn {
    box-sizing: border-box;

    position: absolute;
    width: 150px;
    height: 30px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 13.5px;
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
</style>