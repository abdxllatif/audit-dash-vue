<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des activités
      <p class="subtitle">
        Total : {{ total }} activités
      </p>
      <router-link slot="right" to="/activite/new" class="button">
        Nouvelle activité
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Activités" icon="account-multiple">
        <activite-table :data-url="`http://localhost:8080/api/data/activites`"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ActiviteTable from '@/components/Tables/ActiviteTable.vue'
import axios from 'axios'

export default {
  name: 'activite',
  components: { HeroBar, TitleBar, CardComponent, ActiviteTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Activités'
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
      table: 'activites'
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
