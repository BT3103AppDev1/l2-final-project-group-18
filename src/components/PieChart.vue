<template>
    <div class="chart-wrapper">
        <div class = "second-chart-wrapper">
          <p id = "header">Exercise calorie breakdown by category</p>
            <Doughnut       
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData" />
        </div>

    </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: {
    Doughnut
  },
  data() {
    return {
        chartData: {
          labels: [ 'Cycling', 'February', 'March', 'April', 'May', 'June' ],
          datasets: [ 
            { 
              data: [40, 20, 12, 25, 50, 60] , 
            backgroundColor: ['#CC8B86', '#32CFCB', '#588061', '#DDD8BA', '#FCB64E', '#AB8DE5']
            }
          ]
        },
        chartOptions: {
          responsive: false,
          maintainAspectRatio: false
        }
      }
  }
}
</script>


<style scoped>

.chart-wrapper {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    top: 120px;
    left: 200px;
    width: 440px;
    height: 440px;
    margin-bottom: 20px;
    background-color: #FDE9EA;
    border-radius: 8px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.second-chart-wrapper {
    width: 90%;
    height: 90%;

    align-items: center;
    justify-content: center;

    
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 10px;

}

#my-chart-id {
    margin: 0 auto;
  padding: 20px;
}

#header {
  font-family: 'Mulish', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
}




</style>
