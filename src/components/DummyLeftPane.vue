<template>
    <div class = "left-pane">
        <h2>HealthBuddy</h2>
        <ul>
            <li>Dashboard</li>
            <li>Food</li>
            <li>Exercise</li>
            <li>Leaderboard</li>
            <li>Info cards</li>
            <li>Goals</li>
            <li>Sign out</li>
        </ul>
    </div>

</template>

<script>
export default {
    name: 'LeftPane',
    style: 'width: 100%'
};

</script>

<style scoped>
.left-pane {
    width: 18%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #f1f1f1;
    overflow-y: auto;
}

ul {
  list-style-type: none; /* Remove bullet points from list items */
  padding: 0; /* Remove default padding from list */
}

li {
  padding: 10px; /* Add padding to list items */
}

</style>


