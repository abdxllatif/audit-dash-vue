<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des outils
      <p class="subtitle">
        Total : {{ total }} outils
      </p>
      <router-link slot="right" to="/insertion/outil" class="button">
        Nouveau outil
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Outils" icon="account-multiple">
        <outil-table :data-url="`http://localhost:8080/api/data/outils`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import OutilTable from '@/components/Tables/OutilTable.vue'
import axios from 'axios'

export default {
  name: 'outil',
  components: { HeroBar, TitleBar, CardComponent, OutilTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Outil'
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
      table: 'outils'
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
