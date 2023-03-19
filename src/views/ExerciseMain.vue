<template>
    <ExerciseTopBar/>
    <DummyLeftPane/>
</template>
  
<script>
  
import DummyLeftPane from '../components/DummyLeftPane.vue';
// import DummyTopBar from '../components/DummyTopBar.vue';
import ExerciseTopBar from '../components/ExerciseTopBar.vue';
  
export default {
    name: 'App',
    components: {
        ExerciseTopBar,
        DummyLeftPane
    }
}
  
</script>