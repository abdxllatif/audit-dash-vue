<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des activités
      <router-link slot="right" to="/insertion/activite" class="button">
        Nouvelle activité
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Activités" icon="account-multiple">
        <activite-table :data-url="`http://localhost:8080/api/data/activites`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ActiviteTable from '@/components/Tables/ActiviteTable.vue'
// import axios from 'axios'

export default {
  name: 'activite',
  components: { HeroBar, TitleBar, CardComponent, ActiviteTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Activités'
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
