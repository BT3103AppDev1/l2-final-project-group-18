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
    top: 572.62px;

    transform: rotate(-0.27deg);
}



/* Rectangle 3 for sign in button */
.signOutButtonBox #rectangle3 {
    box-sizing: border-box;

    position: absolute;
    width: 644.91px;
    height: 82.58px;
    left: 344px;
    top: 572.62px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 41px;
    text-align: center;

    color: #33363F;

    background: #DDD8BA;
    border: 1.50794px solid #000000;
    border-radius: 150.794px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>