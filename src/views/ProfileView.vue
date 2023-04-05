<template>
    <profileComponent/>
    <DummyLeftPane />
</template>
  
<script>
  
import profileComponent from '../components/profileComponent.vue';
import DummyLeftPane from '../components/DummyLeftPane.vue'
  
export default {
    name: 'App',
    components: {
        DummyLeftPane,
        profileComponent
    }
}
  
</script>