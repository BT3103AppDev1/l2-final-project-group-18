<template>
    

        <div class = "title">
            <p>Register a FREE account</p>
        </div>

        <div class = "userNameBox">
            <p id = "username">Username</p>
        </div>

        <div class = "emailInputBox">
            <p id = "email">Email</p>
        </div>

        <div class = "passwordInputBox">
            <p id = "password">Password</p>
        </div>

        <div class = "registerButtonBox">
            <button id = "rectangle3" @click = "welcome">Register</button>
            
        </div>

        <div class = "loginLink">
            <p><a class = "loginLink" @click = "login">Already have an account? Sign in</a></p>
        </div>
</template>

<script>
export default {
    name: "signup",
    methods: {
    login() {
      this.$router.push('/login')
    },
    welcome() {
        this.$router.push('/welcome')
    }
  }
}
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
    box-sizing: border-box;

    position: absolute;
    width: 335px;
    height: 48px;
    left: 620px;
    top: 150px;

    border-radius: 40px;

    background: #FFFEFE;
    border: 1.50794px solid #000000;
    
    transform: matrix(1, 0, 0, 1, 0, 0);

}

.userNameBox #username {
    position: absolute;
    top: -5px;
    left: 40px;
    font-family: 'Mulish';
    font-style: normal;
    font-size: 18px;
    color: #B5B7B9;
    text-align: center;
}


.emailInputBox {
    box-sizing: border-box;

    position: absolute;
    width: 335px;
    height: 48px;
    left: 620px;
    top: 240px;

    border-radius: 40px;

    background: #FFFEFE;
    border: 1.50794px solid #000000;
    
    transform: matrix(1, 0, 0, 1, 0, 0);

}

.emailInputBox #email {
    position: absolute;
    top: -5px;
    left: 40px;
    font-family: 'Mulish';
    font-style: normal;
    font-size: 18px;
    color: #B5B7B9;
    text-align: center;
}

.passwordInputBox {
    box-sizing: border-box;

    position: absolute;
    width: 335px;
    height: 48px;
    left: 620px;
    top: 330px;

    
    border-radius: 40px;

    background: #FFFEFE;
    border: 1.50794px solid #000000;
    
    transform: matrix(1, 0, 0, 1, 0, 0);
}

.passwordInputBox #password {
    position: absolute;
    top: -5px;
    left: 40px;
    font-family: 'Mulish';
    font-style: normal;
    font-size: 18px;
    color: #B5B7B9;
    text-align: center;
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