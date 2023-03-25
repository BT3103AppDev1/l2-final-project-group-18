<template>
    <DummyLeftPane/>
    <setGoalComponent/>
  </template>
  
<script>
import DummyLeftPane from '../components/DummyLeftPane.vue';
import SetGoalComponent from '../components/setGoalComponent.vue';
  
  export default {
    name: 'App',
    components: {
      DummyLeftPane,
      SetGoalComponent,
    }
  }
  
</script>
