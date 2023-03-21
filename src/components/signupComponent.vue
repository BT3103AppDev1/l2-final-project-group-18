<template>
    <div class = "main"><center>

        <div class = "title">
            <p>Register a FREE account</p>
        </div>

        <div class = "userNameBox">
            <p id = "rectangle0"></p>
            <p id = "username">Username</p>
        </div>

        <div class = "emailInputBox">
            <p id = "rectangle1"></p>
            <p id = "email">Email</p>
        </div>

        <div class = "passwordInputBox">
            <p id = "rectangle2"></p>
            <p id = "password">Password</p>
        </div>

        <div class = "registerButtonBox">
            <button id = "rectangle3">Register</button>
            
        </div>

        <div class = "loginLink">
            <p><a class = "loginLink" @click = "login">Already have an account? Sign in</a></p>
        </div>
    </center>
    </div>
</template>

<script>
export default {
    name: "signup",
    methods: {
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

/* all components on that page in 1 box */
.main {
    position: absolute;
    width: 645.71px;
    height: 626.21px;
    left: 341.03px;
    top: 103.99px;

    transform: rotate(-0.27deg);
}



/* register a free account*/
.title  {
    position: absolute;
    width: 621.5px;
    height: 79.27px;
    left: 353.98px;
    top: 103.93px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 48.2542px;
    line-height: 72px;
    text-align: center;

    color: #000000;

    transform: matrix(1, 0, 0, 1, 0, 0);
}


/* master sign in box */
/* .masterSignInBox {
    position: absolute;
    width: 645.71px;
    height: 341.57px;
    left: 342px;
    top: 313.99px;

    transform: rotate(-0.27deg);
} */

/* userNameBox */
.userNameBox {
    position: absolute;
    width: 644.99px;
    height: 82.93px;
    left: 354.03px;
    top: 217.98px;

    transform: rotate(-0.27deg);
}



/* Rectangle 0 for username box*/
.userNameBox #rectangle0 {
    box-sizing: border-box;

    position: absolute;
    width: 644.91px;
    height: 82.58px;
    left: 342.07px;
    top: 313.99px;

    background: #FFFEFE;
    border: 1.50794px solid #000000;
    border-radius: 150.794px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}


/* display in the username rectangle */
.userNameBox #username {
    position: absolute;
    width: 296.02px;
    height: 39.14px;
    left: 383.8px;
    top: 335.15px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 27.143px;
    line-height: 41px;
    text-align: center;

    color: #C4C4C4;

    transform: matrix(1, 0, 0, 1, 0, 0);
}

/* emailInputBox */
.emailInputBox {
    position: absolute;
    width: 644.99px;
    height: 82.93px;
    left: 352.03px;
    top: 312.98px;

    transform: rotate(-0.27deg);
}



/* Rectangle 1 for email box*/
.emailInputBox #rectangle1 {
    box-sizing: border-box;

    position: absolute;
    width: 644.91px;
    height: 82.58px;
    left: 352.72px;
    top: 410.51px;

    background: #FFFEFE;
    border: 1.50794px solid #000000;
    border-radius: 150.794px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}


/* display in the Email rectangle */
.emailInputBox #email {
    position: absolute;
    width: 198.09px;
    height: 44.59px;
    left: 466.03px;
    top: 428.78px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 27.143px;
    line-height: 41px;
    text-align: center;

    color: #C4C4C4;

    transform: matrix(1, 0, 0, 1, 0, 0);

}


/* passwordInputBox */
.passwordInputBox {
    position: absolute;
    width: 644.99px;
    height: 82.93px;
    left: 352.64px;
    top: 410.51px;

    transform: rotate(-0.27deg);

}


/* Rectangle 2 for passwordInputBox */
.passwordInputBox #rectangle2 {
    box-sizing: border-box;

    position: absolute;
    width: 644.91px;
    height: 82.58px;
    left: 352.72px;
    top: 410.51px;

    background: #FFFEFE;
    border: 1.50794px solid #000000;
    border-radius: 150.794px;
    transform: matrix(1, 0, 0, 1, 0, 0);
}



/* display in the Password box*/
.passwordInputBox #password {
    position: absolute;
    width: 198.09px;
    height: 44.59px;
    left: 456.39px;
    top: 437.26px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 27.143px;
    line-height: 41px;
    text-align: center;

    color: #C4C4C4;

    transform: matrix(1, 0, 0, 1, 0, 0);
}

/* icon "mail" */
.mailIcon {
    position: absolute;
    width: 44px;
    height: 37px;
    left: 379px;
    top: 336px;
}

/* Vector for mail icon part 1*/
.mailIcon #vector1 {
    position: absolute;
    left: 29.61%;
    right: 66.95%;
    top: 40.38%;
    bottom: 55.17%;

    border: 3px solid #C6BD88;
}



/* Vector for mail icon part 2*/
.mailIcon #vector2 {
    position: absolute;
    left: 29.61%;
    right: 66.95%;
    top: 40.94%;
    bottom: 57.11%;

    border: 3px solid #C6BD88;
}

/* icon "lock" */
.lockIcon {
    position: absolute;
    width: 34px;
    height: 50px;
    left: 384.39px;
    top: 431.45px;
}

/* Vector for the lock icon 1*/
.lockIcon #vector1 {
    position: absolute;
    left: 30.03%;
    right: 67.31%;
    top: 54.56%;
    bottom: 42.13%;

    border: 3px solid #C6BD88;
}



/* Vector for the lock icon 2*/
.lockIcon #vector2 {
    position: absolute;
    left: 30.62%;
    right: 67.9%;
    top: 51.86%;
    bottom: 45.44%;

    border: 3px solid #C6BD88;
}


/* registerButtonBox */
.registerButtonBox {
    position: absolute;
    width: 644.99px;
    height: 82.92px;
    left: 343.92px;
    top: 572.62px;

    transform: rotate(-0.27deg);
}



/* Rectangle 3 for sign in button */
.registerButtonBox #rectangle3 {
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



/* Already have an account? Sign in */
.loginLink {
    position: absolute;
    width: 502.31px;
    height: 44.59px;
    left: 383.86px;
    top: 685.14px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 27.143px;
    line-height: 41px;
    text-decoration-line: underline;

    color: #0A3232;

    transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>