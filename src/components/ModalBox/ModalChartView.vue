<template>
  <b-modal :active.sync="isModalChartViewActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="chart-bar"></b-icon>
            Illustration du graphe
        </p>
      </header>
      <section class="modal-card-body">
        <!--<d-chart :chart-data="this.ChartData" :height="350"></d-chart>-->
        <apexchart id="chart" height="200%" type="pie" :options="this.options" :series="this.data"></apexchart>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Annuler</button>
        <button class="button is-success" @click="printChart">Imprimer</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
// import DChart from '@/components/Charts/DChart'
import Printd from 'printd'
import VueApexCharts from 'vue-apexcharts'

/* eslint-disable */
export default {
  name: 'ModalChartView',
  components: {
    VueApexCharts
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    ChartData: {
      default: null
    },
    data: {
      default: []
    },
    options: {
        default: {}
    }
  },
  data () {
    return {
      isModalChartViewActive: false
    }
  },
  created () {
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      // this.$emit('confirm')
      alert('haha')
    },
    printChart () {
      const d = new Printd()
      console.log(d)
      d.print(document.getElementById('chart'))
    }
  },
  watch: {
    isActive (newValue) {
      this.isModalChartViewActive = newValue
    },
    isModalChartViewActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
