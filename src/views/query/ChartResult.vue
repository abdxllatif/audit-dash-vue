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
      <card-component class="has-table has-mobile-sort-spaced" title="Graphe" icon="account-multiple">
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import axios from 'axios'

export default {
  name: 'ChartResult',
  components: { HeroBar, TitleBar, CardComponent },
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
  },
  data () {
    return {
      isModalActive: false,
      total: 0,
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
