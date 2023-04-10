<template>
    <DummyLeftPane/>
    <infoPage2/>
  </template>
  
<script>
  import DummyLeftPane from '../components/DummyLeftPane.vue';
  import infoPage2 from '../components/infoPage2.vue';
  
  export default {
    name: 'App',
    components: {
      DummyLeftPane,
      infoPage2
    }
  }
  
</script>