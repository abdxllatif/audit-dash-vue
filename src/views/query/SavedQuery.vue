<template>
  <div>
    <modal-chart :is-active="isModalActive" :vars="Object.keys(data[0])" @confirm="Confirm"
               @cancel="Cancel"/>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Les résultats sauvegardées
      <p class="subtitle">
        Total :
      </p>
      <div slot="right">
        <router-link to="/query" class="button is-dark">
          Nouvelle requete
        </router-link>
      </div>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Resultats" icon="account-multiple">
          <b-table :data="data" :columns="columns"></b-table>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import axios from 'axios'
import ModalChart from '../../components/ModalBox/ModalChart.vue'

export default {
  name: 'SavedQuery',
  components: { HeroBar, TitleBar, CardComponent, ModalChart },
  computed: {
    titleStack () {
      return [
        'Statistics',
        'SevedQuery'
      ]
    }
  },
  props: {
  },
  data () {
    return {
      isModalActive: false,
      columns: [],
      data: []
    }
  },
  created () {
    axios
      .get('http://localhost:8080/api/data/formations', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(r => {
        this.isLoading = false
        if (r.data && r.data.results) {
          if (r.data.results.length > this.perPage) {
            this.paginated = true
          }
          this.data = r.data.results
          const a = Object.keys(this.data[0])
          for (let z = 0; z < a.length; z++) {
            this.columns.push({ field: a[z], label: a[z], searchable: true })
          }
          this.$store.state.variables = this.columns
          this.$store.state.data = this.data
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
