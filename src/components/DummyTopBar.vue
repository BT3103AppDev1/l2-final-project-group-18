<template>
    <div class = "top-bar">
        <h4>Current weekly exercise time: 85 minutes</h4>
    </div>
</template>

<script>
export default {
    name: "TopBar"
}
</script>

<style>

.top-bar {
    position: fixed;
    top: 0;
    right: 0;
    /* right:0 -> the element should be positioned at the right edge of its parent element */
    width: 82%;
    height: 15%;
    background-color: #f8e3e3;
    text-align: center;
}

</style>


