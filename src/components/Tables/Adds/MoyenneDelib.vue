<template>
  <div>
      {{ a }}
  </div>
</template>

<script>
import axios from 'axios'

/* eslint-disable */
export default {
  name: 'MoyenneDelib',
  props: {
    Etdid: {
      default: null
    },
    Matid: {
      default: null
    }
  },
  data () {
    return {
      a: ''
    }
  },
  async mounted () {
      await axios.get('http://localhost:8090/api/data/DelibModules/' + this.Etdid + '/' + this.Matid, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          console.log(r.data.results)
          this.a = r.data.results[0].Moyenne
        })
        .catch(e => {
          this.isLoading = false
          this.a = 0
        })
  }
}
</script>
