<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des salles
      <p class="subtitle">
        Total : {{ total }} salles
      </p>
      <router-link slot="right" to="/insertion/salle" class="button">
        Nouvelle salle
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Salles" icon="account-multiple">
        <salle-table :data-url="`http://localhost:8080/api/data/salles`" :checkable="true"/>
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
      total: 0
    }
  },
  created () {
    axios.post('http://localhost:8080/api/stats/count', {
      table: 'salles'
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
