<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des doctorants
      <p class="subtitle">
        Total : {{ total }} doctorants
      </p>
      <router-link slot="right" to="/doctorant/new" class="button">
        Nouveau doctorant
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Doctorants" icon="account-multiple">
        <doctorant-table :data-url="`http://localhost:8090/api/data/doctorants`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import DoctorantTable from '@/components/Tables/DoctorantTable.vue'
import axios from 'axios'

export default {
  name: 'doctorant',
  components: { HeroBar, TitleBar, CardComponent, DoctorantTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Doctorants'
      ]
    }
  },
  data () {
    return {
      total: 0
    }
  },
  created () {
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'doctorants'
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
