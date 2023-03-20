<template>
  <div id = "nav">
    <!-- Here which component to use is defined in index.js!! -->
    <router-link to="/"> Home | </router-link>
    <router-link to="/exercise"> Exercise </router-link>
  </div>
  <router-view />
</template>

<script>

export default {
  name: 'App'
}

</script>

<style>

#nav {
  text-align: center;
}

</style>
