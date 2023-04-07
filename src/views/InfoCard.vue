<template>
  <DummyLeftPane />
  <infoCard />
  <PopupBox />
  
</template>

<script>
import DummyLeftPane from '../components/DummyLeftPane.vue';
import infoCard from '../components/infoCard.vue';
import PopupBox from "@/components/PopupBox.vue";

export default {
  name: 'App',
  components: {
    DummyLeftPane,
    infoCard,
    PopupBox,

  },
}
</script>
