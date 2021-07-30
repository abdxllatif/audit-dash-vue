<template>
  <div>
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
      <card-component class="has-table has-mobile-sort-spaced" title="Resultats" icon="account-multiple" @header-icon-click="flush" header-icon="reload">
        <saved-queries-table ref="sevedTable" :dataUrl="'http://localhost:8082/api/data/save'"></saved-queries-table>
          <!--<b-table :data="data" :columns="columns"></b-table>-->
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import axios from 'axios'
import SavedQueriesTable from '../../components/Tables/SavedQueriesTable.vue'

export default {
  name: 'SavedQuery',
  components: { HeroBar, TitleBar, CardComponent, SavedQueriesTable },
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
      columns: [],
      data: []
    }
  },
  created () {
    /* axios
      .get('http://localhost:8082/api/data/save')
      .then(r => {
        console.log('result')
        console.log(r.data.doc)
        console.log('end result')
        this.isLoading = false
        if (r.data && r.data.doc) {
          if (r.data.doc.length > this.perPage) {
            this.paginated = true
          }
          this.data = r.data.doc
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
      }) */
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
    flush () {
      axios.delete('http://localhost:8082/api/data/save', { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          console.log(r)
          this.$refs.sevedTable.reload()
          this.isLoading = false
          this.$buefy.toast.open({
            message: 'Confirmed',
            type: 'is-success'
          })
        })
        .catch(e => {
          this.isLoading = false
          console.log(e)
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
