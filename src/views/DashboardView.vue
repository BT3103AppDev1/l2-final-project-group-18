<template>
    <DummyLeftPane/>
    <BarChartComponent />
</template>
  
<script>
  
import DummyLeftPane from '../components/DummyLeftPane.vue';
import BarChartComponent from '../components/BarChartComponent.vue';


export default {
    name: 'App',
    components: {
        DummyLeftPane,
        BarChartComponent
}
}
  
</script>