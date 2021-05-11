<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des départements
      <router-link slot="right" to="/insertion/departement" class="button">
        Nouveau département
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Départements" icon="account-multiple">
        <dep-table :data-url="`${$router.options.base}data-sources/deps.json`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import DepTable from '@/components/Tables/DepTable.vue'
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
  created () {
    console.log(this.$session.get('jwt'))
    axios.get('http://localhost:8080/api/data/departements', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
