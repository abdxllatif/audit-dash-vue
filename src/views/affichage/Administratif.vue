<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des administratifs
      <p class="subtitle">
        Total : {{ total }} administratifs
      </p>
      <router-link slot="right" to="/administratif/new" class="button">
        Nouveau administratif
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Administratifs" icon="account-multiple">
        <administratif-table :data-url="`http://localhost:8090/api/data/administratifs`"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import AdministratifTable from '@/components/Tables/AdministratifTable.vue'
import axios from 'axios'

export default {
  name: 'administratif',
  components: { HeroBar, TitleBar, CardComponent, AdministratifTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Administratifs'
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
      table: 'administratifs'
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
