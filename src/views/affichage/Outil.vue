<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des outils
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
// import axios from 'axios'

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
