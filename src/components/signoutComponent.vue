<template>
    <div class = "signOutButtonBox">
            <button id = "rectangle3" @click = "login">Sign Out</button>          
    </div>
</template>

<script>
export default {
    name: "signout",
    methods: {
    login() {
      this.$router.push('/login')
    }
  }
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