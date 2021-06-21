<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des clubs scientifiques et culturels
      <p class="subtitle">
        Total : {{ total }} clubs
      </p>
      <router-link slot="right" to="/insertion/club" class="button">
        Nouveau club
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Clubs" icon="account-multiple">
        <club-table :data-url="`http://localhost:8080/api/data/clubs`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ClubTable from '@/components/Tables/ClubTable.vue'
import axios from 'axios'

export default {
  name: 'club',
  components: { HeroBar, TitleBar, CardComponent, ClubTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Clubs'
      ]
    }
  },
  data () {
    return {
      total: 0
    }
  },
  created () {
    axios.post('http://localhost:8080/api/stats/count', {
      table: 'clubs'
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
