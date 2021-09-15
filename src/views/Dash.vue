<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
          <tiles class="tile is-child">
            <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="totalDep" label="Départements"/>
            <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="totalEtd" label="Etudiants"/>
          </tiles>
          <tiles class="tile is-child">
            <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="totalForm" label="Formations"/>
            <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="this.totalEns" label="Enseignants"/>
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
import axios from 'axios'

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
      bars: false,
      totalEtd: 0,
      totalEns: 0,
      totalDep: 0,
      totalForm: 0
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
  async mounted () {
    await axios.post('http://localhost:8090/api/stats/count', {
      table: 'etudiants'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalEtd = response.data.count
      })
    await axios.post('http://localhost:8090/api/stats/count', {
      table: 'enseignants'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalEns = response.data.count
      })
    await axios.post('http://localhost:8090/api/stats/count', {
      table: 'departements'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalDep = response.data.count
      })
    await axios.post('http://localhost:8090/api/stats/count', {
      table: 'formations'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalForm = response.data.count
      })
    this.$store.state.isFooterBarVisible = true
    this.$store.state.isAsideVisible = true
    this.fillChartData()
  },
  methods: {
  }
}
</script>
