<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
      <card-component title="Performance" @header-icon-click="fillChartData" icon="finance" header-icon="reload">
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart style="height: 100%"
                      ref="bigChart"
                      chart-id="big-line-chart"
                      :chart-data="defaultChart.chartData"
                      :extra-options="defaultChart.extraOptions">
          </line-chart>
        </div>
      </card-component>
      <tiles>
        <card-component title="Salles" icon="finance">
          <d-chart :chart-data="this.SallesData.chartData"></d-chart>
        </card-component>
        <card-component title="Partenaires" icon="finance">
          <d-chart :chart-data="this.ParData.chartData"></d-chart>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import * as chartConfig from '@/components/Charts/chart.config'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import LineChart from '@/components/Charts/LineChart'
import DChart from '@/components/Charts/DChart'
import axios from 'axios'
import Tiles from '../../components/Tiles.vue'

export default {
  name: 'charts',
  components: {
    LineChart,
    CardComponent,
    TitleBar,
    DChart,
    Tiles
  },
  data () {
    return {
      SallesData: {
        chartData: null
      },
      ParData: {
        chartData: null
      },
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      }
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Graphes'
      ]
    }
  },
  mounted () {
    this.$store.state.isFooterBarVisible = true
    this.$store.state.isAsideVisible = true
    this.fillChartData()
    this.fillSallesData()
    this.fillParData()
  },
  methods: {
    randomChartData (n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200))
      }

      return data
    },
    fillSallesData () {
      axios
        .get('http://localhost:8090/api/data/salles', { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.results) {
            if (r.data.results.length > this.perPage) {
              this.paginated = true
            }
            this.$store.state.salles = r.data.results
            this.sallesAmphi = r.data.results.filter(obj => obj.type === 'Amphi')
            this.sallesTD = r.data.results.filter(obj => obj.type === 'Salle TD')
            this.sallesTP = r.data.results.filter(obj => obj.type === 'Salle TP')
            this.sallesBureau = r.data.results.filter(obj => obj.type === 'bureau')
            this.sallesAutres = r.data.results.filter(obj => obj.type === 'autres')
            this.sallesAmphiCount = this.sallesAmphi.length
            console.log(this.sallesAmphiCount)
            this.SallesData.chartData = {
              labels: ['Autres', 'Salle TD', 'Salle TP', 'Amphi', 'Bureau'],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: ['#a3c7c9', '#889d9e', '#647678', '#509d9e', '#109d9e'],
                  data: [this.sallesAutres.length, this.sallesTD.length, this.sallesTP.length, this.sallesAmphi.length, this.sallesBureau.length]
                }
              ]
            }
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    fillParData () {
      axios
        .get('http://localhost:8090/api/data/partenaires', { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.results) {
            if (r.data.results.length > this.perPage) {
              this.paginated = true
            }
            this.ParPed = r.data.results.filter(obj => obj.type === 'Pédagogique')
            this.ParSocio = r.data.results.filter(obj => obj.type === 'SocioEconomique')
            this.ParData.chartData = {
              labels: ['SociaoEconomique', 'Pédagogique'],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: ['#a3c7c9', '#889d9e'],
                  data: [this.ParSocio.length, this.ParPed.length]
                }
              ]
            }
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    fillChartData () {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          }
        ],
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
      }
    }
  }
}
</script>
