<template>
  <DummyLeftPane />
  <DashboardTopBar />
  <BarChartComponent />
  <DashboardBottomStats />
</template>

<script>
import DummyLeftPane from '../components/DummyLeftPane.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'
import DashboardBottomStats from '../components/DashboardBottomStats.vue'
import BarChartComponent from '../components/BarChartComponent.vue'

export default {
  name: 'App',
  components: {
    DummyLeftPane,
    DashboardTopBar,
    DashboardBottomStats,
    BarChartComponent
},
}
</script>
