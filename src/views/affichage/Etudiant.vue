<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des Etudiants
      <p class="subtitle">
        Total : {{ total }} etudiants
      </p>
      <router-link slot="right" to="/etudiant/new" class="button">
        Nouveau étudiant
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Etudiants" icon="account-multiple">
        <etudiant-table :data-url="`http://localhost:8080/api/data/etudiants`"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import EtudiantTable from '@/components/Tables/EtudiantTable.vue'
import axios from 'axios'

export default {
  name: 'etudiants',
  components: { HeroBar, TitleBar, CardComponent, EtudiantTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Etudiants'
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
      table: 'etudiants'
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
