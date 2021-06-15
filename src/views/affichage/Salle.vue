<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des salles
      <router-link slot="right" to="/insertion/salle" class="button">
        Nouvelle salle
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Salles" icon="account-multiple">
        <salle-table :data-url="`http://localhost:8080/api/data/salles`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import SalleTable from '@/components/Tables/SalleTable.vue'
// import axios from 'axios'

export default {
  name: 'salle',
  components: { HeroBar, TitleBar, CardComponent, SalleTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Salles'
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
