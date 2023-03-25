<template>
    <DummyLeftPane/>
    <updateProfile/>
  </template>
  
<script>
  import DummyLeftPane from '../components/DummyLeftPane.vue';
  import updateProfile from '../components/updateProfile.vue';
  
  export default {
    name: 'App',
    components: {
      DummyLeftPane,
      updateProfile
    }
  }
  
</script>
  
  
  