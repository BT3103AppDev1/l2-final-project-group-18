<template>
    <FoodTopBar/>
    <FoodTools/>
    <DummyLeftPane/>
</template>
  
<script>
  
import DummyLeftPane from '../components/DummyLeftPane.vue';
import FoodTools from '../components/FoodTools.vue';
import FoodTopBar from '../components/FoodTopBar.vue';
  
export default {
    name: 'App',
    components: {
        FoodTopBar,
        FoodTools,
        DummyLeftPane
    
    }
}
  
</script>
