<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des enseignants
      <p class="subtitle">
        Total : {{ total }} enseignants
      </p>
      <router-link slot="right" to="/enseignant/new" class="button">
        Nouveau enseignant
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Enseignants" icon="account-multiple">
        <enseignant-table :data-url="`http://localhost:8080/api/data/enseignants`" :checkable="false"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import EnseignantTable from '@/components/Tables/EnseignantTable.vue'
import axios from 'axios'

export default {
  name: 'enseignant',
  components: { HeroBar, TitleBar, CardComponent, EnseignantTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Enseignants'
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
      table: 'enseignants'
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
