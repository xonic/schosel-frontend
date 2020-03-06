<script>
  import Chart from 'chart.js'
  import { Radar } from 'vue-chartjs'

  export default {
    name: 'radar-chart',
    props: {
      labels: Array,
      datasets: Array
    },
    extends: Radar,
    mounted () {
      this.renderChart({
        labels: this.labels,
        datasets: this.datasets
      },
      {
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        }
      })
    }
  }
</script>
