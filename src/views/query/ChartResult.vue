<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Résultat de la requete sous un graphe
      <p class="subtitle">
        requete :
      </p>
      <div slot="right">
        <b-button class="mr-4" type="is-success" @click="SaveChart">Imprimer</b-button>
        <router-link :to="{ name:'QueryResult', params: { json: this.json }}" class="button is-dark">
          Retour
        </router-link>
      </div>
    </hero-bar>
    <section class="section is-main-section">
      <card-component id='chart' v-bind:title="'Graphe `' + type + '` : `' + this.y + '` par `' + this.x +'`'" icon="finance">
          <apexchart height="200%" v-bind:type="type" :options="this.options" :series="this.data"></apexchart>
          <!--x :{{ x }} <br>
          y :{{ y }} <br>
          data :{{ this.data }} <br>
          options :{{ this.options }}-->
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
// import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'
import Printd from 'printd'

/* eslint-disable */
export default {
  name: 'ChartResult',
  components: { HeroBar, TitleBar, CardComponent, VueApexCharts },
  computed: {
    titleStack () {
      return [
        'Statistics',
        'QueryCreator',
        'Results',
        'Chart'
      ]
    }
  },
  props: {
    x: {
      default: null
    },
    y: {
      default: null
    },
    type: {
      default: null
    }
  },
  data () {
    return {
      json: [],
      isModalActive: false,
      total: 0,
      columns: [],
      data: [],
      optionsVide: {},
      options: {
        chart: {
          id: ''
        },
        labels: [],
        xaxis: {
          categories: []
        }
      },
      series: [44, 55, 41, 17, 15],
      a: [],
      a2: []
    }
  },
  created () {
    this.json = this.$store.state.data
    if (this.type === 'pie') {
      for (let i = 0; i < this.$store.state.data.length; i++) {
        let a = parseInt(eval('this.$store.state.data[i].' + this.y))
        this.data.push(a)
      }
      this.options.chart.id = this.x
      const dota = this.$store.state.data
      let b
      for (let j = 0; j < this.$store.state.data.length; j++) {
        b = eval('this.$store.state.data[' + j + '].' + this.x)
        if (b === null) {
          this.options.labels.push('Total ' + this.x)
        } else {
          this.options.labels.push(b)
        }
      }
      // this.options.labels = ['Femme', 'Femme']
      // this.options = this.optionsVide
      console.log(this.options)
    } else if (this.type === 'donut') {
      console.log('nik mok')
      for (let i = 0; i < this.$store.state.data.length; i++) {
        let a = parseInt(eval('this.$store.state.data[' + i + '].' + this.y))
        this.data.push(a)
      }
      this.options.chart.id = this.x
      const dota = this.$store.state.data
      let b
      for (let j = 0; j < this.$store.state.data.length; j++) {
        b = eval('this.$store.state.data[' + j + '].' + this.x)
        if (b === null) {
          this.options.labels.push('Total ' + this.x)
        } else {
          this.options.labels.push(b)
        }
      }
      // this.options.labels = ['Femme', 'Femme']
      // this.options = this.optionsVide
      console.log(this.options)
    } else {
        console.log(this.type)
        let b
        // const dota = this.$store.state.data
        this.options.chart.id = this.x
        for (let j = 0; j < this.$store.state.data.length; j++) {
            b = eval('this.$store.state.data[' + j + '].' + this.y)
            console.log(b)
            this.a.push(b)
        }
        this.data.push({ name: this.y, data: this.a })
        for (let i = 0; i < this.$store.state.data.length; i++) {
            console.log(this.x)
            b = eval('this.$store.state.data[' + i + '].' + this.x)
            console.log(b)
            this.columns.push(b)
        }
        // this.options.xaxis = '{' + this.x + ': ' + '[' + this.columns + ']' + '}'
        // eval('this.options.xaxis.' + this.x + '.push(' + this.columns + ')')
        b = this.x
        for (let h = 0; h < this.columns.length; h++) {
          if (this.columns[h] === null) {
            this.options.xaxis.categories.push('Total ' + this.x)
          } else {
            this.options.xaxis.categories.push(this.columns[h])
          }
        }
        console.log('yo options')
        console.log(this.options)
    }
  },
  mounted () {
    // const p = new Printd()
  },
  methods: {
    ChartModal () {
      this.isModalActive = true
    },
    Confirm () {
      this.isModalActive = false
    },
    Cancel () {
      this.isModalActive = false
    },
    SaveChart () {
      const d = new Printd()
      // alert('not yet')
      console.log(d)
      d.print( document.getElementById('chart', [`#chart { padding: 1000px; }`]))
    }
  }
}
</script>
