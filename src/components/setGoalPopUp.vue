<template>
    <div v-if = "showSet" class = "setGoal">
        <button @click = "closePopUp" class = "close-icon">x</button>
        <p>hi</p>
    </div>
</template>

<script>
export default {
    name: 'SetGoalPopUp',
    props: {
        showSet: {
            type: Boolean,
            required: true
        },
    },
    methods: {
        closePopUp() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.setGoal {
    position: absolute;
    width: 300px;
    height: 300px;
    background-color: #FAF4E1;
    border: 5px solid #9F978B;
    border-radius: 20px;
    text-align: center;
    padding-top: 100px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 50px;
  cursor: pointer;
}

</style>