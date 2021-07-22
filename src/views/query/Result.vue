<template>
  <div>
    <modal-chart :is-active="isModalActive" :vars="Object.keys(data[0])" :x="this.x" :y="this.y" @confirm="Confirm"
               @cancel="Cancel"/>
    <modal-save-result :is-active="isSaveModalActive" :vars="Object.keys(data[0])" @confirm="ConfirmSave"
               @cancel="Cancel"/>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Résultat de la requete
      <p class="subtitle">
        requete :
      </p>
      <div slot="right">
        <b-button class="mr-4" type="is-info" @click="ChartModal">Génerer un graphe</b-button>
        <b-button class="mr-4" type="is-success" @click="SaveChart">Sauvegarder</b-button>
        <router-link to="/query" class="button is-dark">
          Retour
        </router-link>
      </div>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Resultats" icon="account-multiple">
          <b-table :data="this.data" :columns="columns"></b-table>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ModalChart from '../../components/ModalBox/ModalChart.vue'
import ModalSaveResult from '../../components/ModalBox/ModalSaveResult.vue'

export default {
  name: 'QueryResult',
  components: { HeroBar, TitleBar, CardComponent, ModalChart, ModalSaveResult },
  computed: {
    titleStack () {
      return [
        'Statistics',
        'QueryCreator',
        'Results'
      ]
    }
  },
  props: {
    json: {}
  },
  data () {
    return {
      isSaveModalActive: false,
      isModalActive: false,
      columns: [],
      data: [],
      x: [],
      y: []
    }
  },
  created () {
    this.x = this.$store.state.attDim
    this.y = this.$store.state.checked
    // this.data = r.data.results
    this.data.push(this.json)
    const a = Object.keys(this.json)
    for (let z = 0; z < a.length; z++) {
      this.columns.push({ field: a[z], label: a[z], searchable: true })
    }
    this.$store.state.variables = this.columns
    this.$store.state.data = this.json
    console.log('wsalt')
    console.log(this.data)
  },
  methods: {
    ChartModal () {
      this.isModalActive = true
    },
    Confirm () {
      this.isModalActive = false
    },
    ConfirmSave () {
      this.isSaveModalActive = false
    },
    Cancel () {
      this.isModalActive = false
      this.isSaveModalActive = false
    },
    SaveChart () {
      this.isSaveModalActive = true
    }
  }
}
</script>
