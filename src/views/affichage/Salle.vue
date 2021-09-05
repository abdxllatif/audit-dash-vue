<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des salles
      <p class="subtitle">
        Total : {{ total }} salles
      </p>
      <router-link slot="right" to="/salle/new" class="button">
        Nouvelle salle
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Salles" icon="account-multiple">
        <salle-table :data-url="`http://localhost:8090/api/data/salles`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import SalleTable from '@/components/Tables/SalleTable.vue'
import axios from 'axios'

export default {
  name: 'salle',
  components: { HeroBar, TitleBar, CardComponent, SalleTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Salles'
      ]
    }
  },
  data () {
    return {
      total: 0,
      sallesAmphi: []
    }
  },
  created () {
    axios
      .get('http://localhost:8090/api/data/salles', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(r => {
        this.isLoading = false
        if (r.data && r.data.results) {
          if (r.data.results.length > this.perPage) {
            this.paginated = true
          }
          this.$store.state.salles = r.data.results
          this.sallesAmphi = r.data.results.filter(obj => obj.type === 'Amphi')
          console.log('Amphi: ' + this.sallesAmphi.length)
          this.sallesTD = r.data.results.filter(obj => obj.type === 'Salle TD')
          console.log('TD: ' + this.sallesTD.length)
          this.sallesTP = r.data.results.filter(obj => obj.type === 'Salle TP')
          console.log('TP: ' + this.sallesTP.length)
          this.sallesBureau = r.data.results.filter(obj => obj.type === 'Bureau')
          console.log('Bureau: ' + this.sallesBureau.length)
          this.sallesAutres = r.data.results.filter(obj => obj.type === 'Autres')
          console.log('Autres: ' + this.sallesAutres.length)
        }
      })
      .catch(e => {
        this.isLoading = false
        this.$buefy.toast.open({
          message: `Error: ${e.message}`,
          type: 'is-danger'
        })
      })
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'salles'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log('Total des salles: ' + response.data.count)
        this.total = response.data.count
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
  }
}
</script>
