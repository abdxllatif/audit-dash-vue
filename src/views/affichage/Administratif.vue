<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des administratifs
      <router-link slot="right" to="/insertion/administratif" class="button">
        Nouveau administratif
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Administratif" icon="account-multiple">
        <dep-table :data-url="`http://localhost:8080/api/data/administratifs`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import DepTable from '@/components/Tables/DepTable.vue'
// import axios from 'axios'

export default {
  name: 'administratif',
  components: { HeroBar, TitleBar, CardComponent, DepTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Administratifs'
      ]
    }
  }
/*  created () {
    console.log(this.$session.get('jwt'))
    axios.get('http://localhost:8080/api/data/departements', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        console.log(this.listings.results)
      })
      .catch((error) => {
        console.log(error)
      })
  } */
}
</script>
