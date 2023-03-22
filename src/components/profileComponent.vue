<template>
    <div class="title">
        <p>Hello, Winnie!</p>
        <p>Welcome to your personal health tracker</p>
    </div>

    <div class="subtitle">
        <p>Give us some basic information to get started</p>
    </div>

    <div class="container1">
        <p id="height-label">Height:</p>
        <div class = "height-field">
            <p id = "height">Height</p>
        </div>
    </div>

    <div class="container2">
        <p id="weight-label">Weight:</p>
        <div class = "weight-field">
            <p id = "weight">Weight</p>
        </div>
    </div>

    <div class = "confirm-button-wrapper">
            <button id = "confirm-button" @click = "home">Confirm</button>
    </div>
    <img class = "icon-male" src="../assets/male icon.png" alt="image here">
    <img class = "icon-female" src="../assets/female icon.png" alt="image here">
    <img class = "image" src="../assets/welcome.png" alt="image here">
    
</template>


<script>
export default {
    name: "profileComponent",
    methods: {
    home() {
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
.image {
    display: block;
    width: 220px;
    height: 330px;
    position: absolute;
    top: 300px;
    left: 400px;
}

.title {
    position: absolute;
    width: 953.85px;
    height: 118px;
    left: 300px;
    /* top: 79px; */

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;

    color: #061428;

    transform: rotate(0.07deg);
}

.subtitle {
    /* Give us some basic information to get started */
    position: absolute;
    width: 736.17px;
    height: 42px;
    left: 300px;
    top: 150px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 10px;
    /* identical to box height */

    /* bl */
    color: #061428;

    transform: rotate(0.04deg);

}
.container1 {
    display: flex;
}

.container2 {
    display: flex;
}

.height-field {
    box-sizing: border-box;

    position: absolute;
    width: 335px;
    height: 48px;
    left: 900px;
    top: 400px;

    background: #ECECEC;
    border: 1px solid #C1C1C1;
    border-radius: 20px;

}

#height-label {
    position: absolute;
    width: 149px;
    height: 41px;
    left: 750px;
    top: 370px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 20px;
    /* or 63% */
    display: flex;
    align-items: center;

    color: #A88151;
}

#weight-label {
    position: absolute;
    width: 149px;
    height: 41px;
    left: 750px;
    top: 450px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 20px;
    /* or 63% */
    display: flex;
    align-items: center;

    color: #A88151;
}
.height-field #height {
    position: absolute;
    top: -5px;
    left: 40px;
    font-family: 'Mulish';
    font-style: normal;
    font-size: 18px;
    color: #B5B7B9;
    text-align: center;
}

.weight-field {
    box-sizing: border-box;

    position: absolute;
    width: 335px;
    height: 48px;
    left: 900px;
    top: 480px;

    background: #ECECEC;
    border: 1px solid #C1C1C1;
    border-radius: 20px;

}

.weight-field #weight {
    position: absolute;
    top: -5px;
    left: 40px;
    font-family: 'Mulish';
    font-style: normal;
    font-size: 18px;
    color: #B5B7B9;
    text-align: center;
}

.confirm-button-wrapper {
    position: absolute;
    left: 1000px;
    top: 580px;

    width: 700px;
    height: 50px;
}

.confirm-button-wrapper #confirm-button {

    width: 168.3px;
    height: 44.59px;
    
    font-family: 'Mulish';
    font-style: normal;
    font-size: 20px;
    text-align: center;
    color: #746652;

    background: #DDD8BA;
    border-radius: 30px;
}

/* for the icons */
.icon-female {
  /* Define the default appearance of the icon */
  width: 120px;
  height: 150px;
  background-image: "../assets/female icon.png";
  display: block;
    position: absolute;
    top: 200px;
    left: 1100px;
}


/* :active is a pseudo-class and .active is a class selector */
/* Apply the :active pseudo-class to the icon */
.icon-female:active {
  /* Define the appearance of the icon when it's clicked */
  transform: scale(0.8);
}

.icon-male {
  /* Define the default appearance of the icon */
  width: 120px;
  height: 150px;
  background-image: "../assets/male icon.png";
  display: block;
    position: absolute;
    top: 200px;
    left: 900px;
}
</style>