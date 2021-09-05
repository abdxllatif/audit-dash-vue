<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Statistiques générales
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="totalEtd" label="Etudiants"/>
        <card-widget class="tile is-child" type="is-info" icon="account-tie" :number="totalEns" label="Enseignants"/>
        <card-widget class="tile is-child" type="is-primary" icon="chart-timeline-variant" :number="totalPar" label="Partenaires"/>
        <card-widget class="tile is-child" type="is-info" icon="school" :number="totalDoc" label="Doctorants"/>
      </tiles>
      <tiles>
        <card-widget class="tile is-child" type="is-primary" icon="tools" :number="totalDep" label="Départements"/>
        <card-widget class="tile is-child" type="is-info" icon="school" :number="totalFrm" label="Formations"/>
        <card-widget class="tile is-child" type="is-primary" icon="account-group" :number="totalClb" label="Clubs"/>
        <card-widget class="tile is-child" type="is-info" icon="lightbulb-group" :number="totalAct" label="Activités"/>
      </tiles>
      <tiles>
        <card-widget class="tile is-child" type="is-primary" icon="tools" :number="totalSal" label="Salles"/>
        <card-widget class="tile is-child" type="is-info" icon="school" :number="totalOut" label="Outils"/>
        <card-widget class="tile is-child" type="is-info" icon="account-group" :number="totalAdm" label="Administratifs"/>
      </tiles>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import axios from 'axios'

export default {
  name: 'GeneralStat',
  components: {
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar
  },
  data () {
    return {
      totalEtd: 0,
      totalPar: 0,
      totalEns: 0,
      totalDoc: 0,
      totalDep: 0,
      totalFrm: 0,
      totalAct: 0,
      totalClb: 0,
      totalSal: 0,
      totalOut: 0,
      totalAdm: 0
    }
  },
  computed: {
    titleStack () {
      return [
        'Statistiques',
        'Générales'
      ]
    }
  },
  mounted () {
    this.$store.state.isFooterBarVisible = true
    this.$store.state.isAsideVisible = true
  },
  created () {
    // etudiants count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'etudiants'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalEtd = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
    // partenaires count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'partenaires'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalPar = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // enseignants count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'enseignants'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalEns = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // doctorants count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'doctorants'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalDoc = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // departements count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'departements'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalDep = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // formations count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'formations'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalFrm = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // clubs count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'clubs'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalClb = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // activites count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'activites'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalAct = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // salles count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'salles'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalSal = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // outils count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'outils'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalOut = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // Administratifs count
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'administratifs'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalAdm = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
  },
  methods: {
  }
}
</script>
