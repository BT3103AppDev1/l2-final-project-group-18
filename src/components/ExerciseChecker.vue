<template>
    <div v-if = "showChecker" class = "exercise-checker">
        <!-- This item only rendered if showChecker = true -->
        <a @click = "closeChecker">Back</a>
        <div class = "dummy"></div>
    </div>
</template>

<script>

export default {
    name: 'Exercise-Checker',
    props: {
        showChecker: {
            type: Boolean,
            required: true
            // i.e. the parent must provide a value for it
        }
    },
    methods: {
        closeChecker() {
            this.$emit('close');
        }
    }
}

</script>

<style>

.exercise-checker {
    width: 400px;
    height: 400px;
    background-color: orange;
}


</style>

