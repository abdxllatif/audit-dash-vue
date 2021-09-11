<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
          <tiles class="tile is-child">
            <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="2" label="Départements"/>
            <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="512" label="Etudiants"/>
          </tiles>
          <tiles class="tile is-child">
            <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="3" label="Formations"/>
            <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="45" label="Enseignants"/>
          </tiles>
          <span>
              <b-datepicker
                  inline
                  v-model="date"
                  :events="events"
                  indicators="dots"
                  >
              </b-datepicker>
          </span>
      </tiles>
      <tiles>
        <card-component title="Etudiants par département" class="tile is-child p-0">
              <apexchart id="chart" width="100%" type="donut" :options="this.options" :series="this.data"></apexchart>
        </card-component>
        <card-component title="Etudiants par département" class="tile is-child p-0">
              <apexchart id="chart" width="100%" type="pie" :options="this.options" :series="this.data"></apexchart>
        </card-component>
      </tiles>
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
    </section>
  </div>
</template>

<script>
import * as chartConfig from '@/components/Charts/chart.config'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import LineChart from '@/components/Charts/LineChart'
import VueApexCharts from 'vue-apexcharts'

/* eslint-disable */
export default {
  name: 'dash',
  components: {
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar,
    VueApexCharts
  },
  data () {
    return {
      options: {
        chart: {
          id: ''
        },
        labels: ['CPI', 'CS']
      },
      data: [300, 350],
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      },
      date: new Date(),
      events: [
        new Date(2021, 7, 2),
        new Date(2021, 7, 6),
        {
          date: new Date(2021, 7, 6),
          type: 'is-info'
        },
        {
          date: new Date(2021, 7, 8),
          type: 'is-danger'
        },
        {
          date: new Date(2021, 7, 10),
          type: 'is-success'
        },
        {
          date: new Date(2021, 7, 10),
          type: 'is-link'
        },
        new Date(2021, 7, 12),
        {
          date: new Date(2021, 7, 12),
          type: 'is-warning'
        },
        {
          date: new Date(2021, 7, 16),
          type: 'is-danger'
        },
        new Date(2021, 7, 20),
        {
          date: new Date(2021, 6, 29),
          type: 'is-success'
        },
        {
          date: new Date(2021, 6, 29),
          type: 'is-success'
        },  
        {
          date: new Date(2021, 7, 29),
          type: 'is-warning'
        },
        {
          date: new Date(2021, 8, 29),
          type: 'is-info'
        }
      ],
      bars: false
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Dashboard'
      ]
    }
  },
  mounted () {
    this.$store.state.isFooterBarVisible = true
    this.$store.state.isAsideVisible = true
    this.fillChartData()
  },
  methods: {
    randomChartData (n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200))
      }

      return data
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
