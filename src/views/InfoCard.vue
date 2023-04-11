<template>
  <DummyLeftPane />
  <infoCard />
  
  
</template>

<script>
import DummyLeftPane from '../components/DummyLeftPane.vue';
import infoCard from '../components/infoCard.vue';


export default {
  name: 'App',
  components: {
    DummyLeftPane,
    infoCard,
    

  },
}
</script>
