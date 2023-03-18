<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id = "leftpane">
    <!-- Here which component to use is defined in index.js!! -->
    <RouterLink to="/">Home</RouterLink>
  </div>
  <RouterView />
</template>

