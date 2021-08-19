<template>
  <div>
      {{ a }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Name',
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    id: {
      default: null
    }
  },
  data () {
    return {
      a: ''
    }
  },
  created () {
    if (this.dataUrl) {
      axios.get(this.dataUrl + this.id, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          console.log(r)
          this.a = r.data.data.nom
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
