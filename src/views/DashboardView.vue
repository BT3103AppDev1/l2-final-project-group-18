<template>
  <DummyLeftPane />
  <DashboardTopBar />
  <BarChartComponent />
  <DashboardBottomStats />
  <PieChart/>
</template>

<script>
import DummyLeftPane from '../components/DummyLeftPane.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'
import DashboardBottomStats from '../components/DashboardBottomStats.vue'
import BarChartComponent from '../components/BarChartComponent.vue'
import PieChart from '../components/PieChart.vue'


export default {
  name: 'App',
  components: {
    DummyLeftPane,
    DashboardTopBar,
    DashboardBottomStats,
    BarChartComponent,
    PieChart
  },
  data() {
    return {
      chartData: {
        labels: ['Red', 'Blue', 'Yellow'],
        data: [30, 50, 20]
      }
    }
  },
}
</script>
