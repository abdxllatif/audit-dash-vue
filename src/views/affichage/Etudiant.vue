<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des Etudiants
      <router-link slot="right" to="/insertion/etudiant" class="button">
        Nouveau étudiant
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Etudiants" icon="account-multiple">
        <etudiant-table :data-url="`http://localhost:8080/api/data/etudiants`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import EtudiantTable from '@/components/Tables/EtudiantTable.vue'
import axios from 'axios'

export default {
  name: 'etudiants',
  components: { HeroBar, TitleBar, CardComponent, EtudiantTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Etudiants'
      ]
    }
  },
  created () {
    console.log(this.$session.get('jwt'))
    axios.get('http://localhost:8080/api/data/departements', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        console.log(this.listings.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
