<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
        <tiles>
            <card-component title="Liste des attributs" class="tile is-child">
                <list-att></list-att>
            </card-component>
            <card-component title="Attributs choisis" class="tile is-child">
                dzk,
            </card-component>
            <card-component title="Liste des dimentions" class="tile is-child">
                fek,
            </card-component>
        </tiles>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import axios from 'axios'
import Tiles from '../../components/Tiles.vue'
import CardComponent from '@/components/CardComponent'
import ListAtt from '../../components/Query/ListAtt.vue'

export default {
  name: 'QueryCreator',
  components: { TitleBar, Tiles, CardComponent, ListAtt },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Activités'
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
      table: 'activites'
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
