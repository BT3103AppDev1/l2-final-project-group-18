<template>
  <DummyLeftPane />
  <DashboardTopBar />
  <DashboardBottomStats />
</template>

<script>
import DummyLeftPane from '../components/DummyLeftPane.vue'
import DashboardTopBar from '../components/DashboardTopBar.vue'
import DashboardBottomStats from '../components/DashboardBottomStats.vue'

export default {
  name: 'App',
  components: {
    DummyLeftPane,
    DashboardTopBar,
    DashboardBottomStats,
  },
}
</script>
