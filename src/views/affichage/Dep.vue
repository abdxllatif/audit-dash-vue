<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des départements
      <p class="subtitle">
        Total : {{ total }} départements
      </p>
      <router-link slot="right" to="/departement/new" class="button">
        Nouveau département
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Départements" icon="account-multiple">
        <dep-table :data-url="`http://localhost:8080/api/data/departements`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import DepTable from '@/components/Tables/DepTable.vue'
// import CardWidget from '@/components/CardWidget'
import axios from 'axios'

export default {
  name: 'dep',
  components: { HeroBar, TitleBar, CardComponent, DepTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Département'
      ]
    }
  },
  data () {
    return {
      total: 0
    }
  },
  created () {
    axios.post('http://localhost:8080/api/stats/count', {
      table: 'departements'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
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
