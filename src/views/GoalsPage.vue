<template>
    <DummyLeftPane/>
    <SetGoalComponent/>
  </template>
  
<script>
import DummyLeftPane from '../components/DummyLeftPane.vue';
import SetGoalComponent from '../components/SetGoalComponent.vue';
  
  export default {
    name: 'App',
    components: {
      DummyLeftPane,
      SetGoalComponent,
    }
  }
  
</script>
