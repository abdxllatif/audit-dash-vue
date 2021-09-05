<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des partenaires
      <p class="subtitle">
        Total : {{ total }} partenaires
      </p>
      <router-link slot="right" to="/partenaire/new" class="button">
        Nouveau partenaire
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Partenaires" icon="account-multiple">
        <par-table :data-url="`http://localhost:8090/api/data/partenaires`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ParTable from '@/components/Tables/ParTable.vue'
import axios from 'axios'

export default {
  name: 'par',
  components: { HeroBar, TitleBar, CardComponent, ParTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Partenaires'
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
      table: 'partenaires'
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
