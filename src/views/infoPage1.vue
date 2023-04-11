<template>
    <DummyLeftPane/>
    <infoPage1/>
  </template>
  
<script>
  import DummyLeftPane from '../components/DummyLeftPane.vue';
  import infoPage1 from '../components/infoPage1.vue';
  
  export default {
    name: 'App',
    components: {
      DummyLeftPane,
      infoPage1
    }
  }
  
</script>