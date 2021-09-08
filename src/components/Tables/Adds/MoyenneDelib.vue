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
          this.a = r.data.results[0].Moyenne
          // this.a = eval('r.data.data.' + this.att)
        })
        .catch(e => {
          this.isLoading = false
          this.a = 0
          /* this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          }) */
        })
  }
}
</script>
