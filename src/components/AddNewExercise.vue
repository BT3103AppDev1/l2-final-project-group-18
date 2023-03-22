<template>
    <div v-if = "showAdd" class = "add-new-exercise">
        <input type = "text" v-model.lazy = "exerciseType" 
        placeholder="Exercise Type">
        <input type = "number" v-model.lazy = "caloriesMin"
        placeholder="Calories Per Min">
        <button @click="addExercise">Add</button>

        <button @click = "closeAdd">Back</button>
    </div>
</template>

<script>

export default {
    name: 'AddExercise',
    data() {
        return {
            exerciseType: "",
            caloriesMin: ""
        }
    },
    props: {
        showAdd: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        addExercise() {
            if (!this.exerciseType || !this.caloriesMin) return; // validate inputs
            this.$emit('exercise-added', {
                type: this.exerciseType,
                calories: parseInt(this.caloriesMin)
            });
            // emits an event named 'exercise-added',
            // which has 2 properties, type and calories
            this.exerciseType = '';
            this.caloriesMin = '';
        },
        closeAdd() {
            this.$emit('close');
        }
    }
}

</script>
