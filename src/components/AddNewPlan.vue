<template>
    <div v-if = "showPlanAdd" class = "add-new-plan">
        <div class = "add-new-text">
            <p>Enter your exercise planning here: </p>
        </div>

        <p><a class = "back-link" @click = "closeAdd">Back</a></p>
    </div>
</template>

<script>

export default {
    name: 'PlanExercise',
    data() {
        return {

        }
    },
    props: {
        showPlanAdd: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeAdd() {
            this.$emit('close');
        }
    }
}

</script>

<style scoped>

.add-new-plan {
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

.add-new-text {
    position: relative;
    top: 5px;
    left: 20px;

    font-family: 'Mulish';
    font-style: normal;
    font-size: 20px;
    color: #746652;
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

