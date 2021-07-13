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
        <router-link to="/query/results" class="button is-dark">
          Retour
        </router-link>
      </div>
    </hero-bar>
    <section class="section is-main-section">
      <card-component v-bind:title="'Graphe ' + type" icon="account-multiple">
          <apexchart width="70%" v-bind:type="type" :options="options" :series="data"></apexchart>
          x :{{ x }} <br>
          y :{{ y }}
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
      isModalActive: false,
      total: 0,
      columns: [],
      data: [],
      options: {},
      series: [44, 55, 41, 17, 15],
      a: []
    }
  },
  created () {
    if (this.type === ('pie' || 'donut')) {
      for (let i = 0; i < this.$store.state.data.length; i++) {
        console.log(eval('this.$store.state.data[i].' + this.x))
        this.data.push(eval('this.$store.state.data[i].' + this.x))
      }
    } else if (this.type === 'bar') {
        let b = ''
        for (let j = 0; j < this.$store.state.data.length; j++) {
            b = eval('this.$store.state.data[j].' + this.x)
            console.log(b)
            this.a.push(b)
        }
        this.data.push({ name: this.x, data: this.a })
        console.log('yo a')
        console.log(this.a)
        console.log('yo data')
        console.log(this.data)
    } else if (this.type === 'area') {
        let b = ''
        for (let k = 0; k < this.$store.state.data.length; k++) {
            b = eval('this.$store.state.data[k].' + this.x)
            console.log(b)
            this.a.push(b)
        }
        this.data.push({ name: this.x, data: this.a })
        console.log('yo')
        console.log(this.a)
    }
    
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
      alert('not yet')
    }
  }
}
</script>
