<template>
    <div v-if = "showFoodAdd" class = "add-new-food">
        <p>Add new food type and calories per 100g: </p>

        <p class = "before-input">
        Food Type:
        </p>
        <p class = "before-input">
            Calories / 100g: 
        </p>

        <p>
            <a class = "back-link" @click = "closeFoodAdd">Back</a>
        </p>
    </div>

</template>

<script>

export default {
    name: 'AddFood',
    data() {
        return {

        }
    },
    props: {
        showFoodAdd: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeFoodAdd() {
            this.$emit('close');
        }
    }
}

</script>

<style scoped>

.add-new-food {
    position: absolute;
    top: -450px;
    left: -40px;

    width: 650px;
    height: 280px;

    border-radius: 21px;

    background: #FAF4E1;
    border: 5px solid #9F978B;
    border-radius: 20px;
}

input {
    position: relative;
    left: 10px;

    width: 420px;
    height: 35px;

    background: #ECECEC;
    border: 1px solid #C1C1C1;
    border-radius: 20px;    
}

.before-input {
    position: relative;
    left: 20px;
    
    font-family: 'Mulish';
    font-style: normal;
    font-size: 24px;

    color: #b0803e;    
}

.back-link {
    position: absolute;
    top: 10px;
    right: 10px;

    font-family: 'Mulish';
    font-style: normal;
    font-size: 15px;
    color: #746652;
}

.back-link:hover {
    color:brown;
    cursor: pointer;
    text-decoration: underline;
}


</style>

