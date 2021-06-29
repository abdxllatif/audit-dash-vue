import { Doughnut, mixins } from 'vue-chartjs'

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: {
    chartdata: Object
  },
  data: () => ({
    chartdata: this.chartdata,
    options: {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.$watch('chartData', (newVal, oldVal) => {
      if (!oldVal) {
        this.renderChart(
          this.chartData,
          this.options
        )
      }
    }, { immediate: true })
  }
}
