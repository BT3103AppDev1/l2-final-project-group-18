<template>
    <div class="title">
        <p>Hello, Winnie!</p>
        <p>Update your personal health tracker</p>
    </div>

    <div class="subtitle">
        <p>Start updating your height and weight</p>
    </div>

    <div class="container1">
        <p id="height-label">Height:</p>
        <div class = "height-field">
            <p id = "height"></p>
        </div>
        <p id="height-unit">cm</p>
    </div>

    <div class="container2">
        <p id="weight-label">Weight:</p>
        <div class = "weight-field">
            <p id = "weight"></p>
        </div>
        <p id="weight-unit">kg</p>
    </div>

    <div class = "confirm-button-wrapper">
            <button id = "confirm-button" @click = "home">Confirm</button>
    </div>

    <div class = "cancel-button-wrapper">
            <button id = "cancel-button" @click = "home">Cancel</button>
    </div>

    <img class = "image" src="../assets/welcome.png" alt="image here">
    
</template>


<script>
export default {
    name: "updateProfileComponent",
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

#height-unit {
    position: absolute;
    width: 149px;
    height: 41px;
    left: 1250px;
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

#weight-unit {
    position: absolute;
    width: 149px;
    height: 41px;
    left: 1250px;
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
    left: 800px;
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

.cancel-button-wrapper {
    position: absolute;
    left: 1000px;
    top: 580px;

    width: 700px;
    height: 50px;
}

.cancel-button-wrapper #cancel-button {

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
</style>