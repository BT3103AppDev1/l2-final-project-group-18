<template>
    <DummyLeftPane/>
    <profileComponent/>
  </template>
  
<script>
  import DummyLeftPane from '../components/DummyLeftPane.vue';
  import profileComponent from '../components/profileComponent.vue';
  
  export default {
    name: 'App',
    components: {
      DummyLeftPane,
      profileComponent
    }
  }
  
</script>
  
  
  