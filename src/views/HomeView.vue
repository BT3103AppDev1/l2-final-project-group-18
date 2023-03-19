<template>
  <DummyTopBar/>
  <DummyLeftPane/>
</template>

<script>

import DummyLeftPane from '../components/DummyLeftPane.vue';
import DummyTopBar from '../components/DummyTopBar.vue';

export default {
  name: 'App',
  components: {
    DummyTopBar,
    DummyLeftPane
  }
}

</script>


