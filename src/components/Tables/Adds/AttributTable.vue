<template>
  <div>
      {{ a }}
  </div>
</template>

<script>
import axios from 'axios'

/* eslint-disable */
export default {
  name: 'AttributTable',
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    id: {
      default: null
    },
    att: {
      default: ''
    }
  },
  data () {
    return {
      a: ''
    }
  },
  async mounted () {
    if (this.dataUrl) {
      await axios.get(this.dataUrl + this.id, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          // this.a = r.data.data.nom
          this.a = eval('r.data.data.' + this.att)
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
