<template>
  <div class="popup-box" v-show="visible">
    <div class="popup-content">
      <div class="popup-header">
        <h2>{{ title }}</h2>
        <button @click="close">X</button>
      </div>
      <div class="popup-body">
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupBox',
  props: {
    title: String,
    text: String,
    visible: Boolean,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.popup-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  max-width: 80%;
  max-height: 80%;
  background: white;
  border-radius: 5px;
  overflow: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.popup-header h2 {
  margin: 0;
}

.popup-header button {
  border: none;
  background: transparent;
  cursor: pointer;
}

.popup-body {
  padding: 10px;
  text-align: justify;
  line-height: 1.5;
  font-size: 16px;
}
</style>