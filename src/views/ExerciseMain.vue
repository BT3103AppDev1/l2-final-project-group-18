<template>
    <ExerciseTopBar/>
    <ExerciseTools/>
    <DummyLeftPane/>
</template>
  
<script>
  
import DummyLeftPane from '../components/DummyLeftPane.vue';
import ExerciseTopBar from '../components/ExerciseTopBar.vue';
import ExerciseTools from '../components/ExerciseTools.vue';
  
export default {
    name: 'App',
    components: {
        ExerciseTopBar,
        ExerciseTools,
        DummyLeftPane
    }
}
  
</script>