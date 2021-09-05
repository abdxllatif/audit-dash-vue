<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des formations
      <p class="subtitle">
        Total : {{ total }} formations
      </p>
      <router-link slot="right" to="/formation/new" class="button">
        Nouvelle formation
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Formations" icon="account-multiple">
        <form-table :data-url="`http://localhost:8090/api/data/formations`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import FormTable from '@/components/Tables/FormTable.vue'
import axios from 'axios'

export default {
  name: 'form',
  components: { HeroBar, TitleBar, CardComponent, FormTable },
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
    axios.post('http://localhost:8090/api/stats/count', {
      table: 'formations'
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
