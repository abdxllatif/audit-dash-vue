<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des partenaires
      <router-link slot="right" to="/insertion/partenaire" class="button">
        Nouveau partenaire
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Partenaires" icon="account-multiple">
        <par-table :data-url="`http://localhost:8080/api/data/partenaires`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ParTable from '@/components/Tables/ParTable.vue'
// import axios from 'axios'

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
