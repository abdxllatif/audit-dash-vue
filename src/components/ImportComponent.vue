<template>
  <card-component title="Importer un fichier CSV" icon="account-circle">
    <form @submit.prevent="submit">
      <b-field horizontal label="import CSV">
        <file-picker/>
      </b-field>
      <b-field horizontal>
        <div class="control">
          <button type="submit" class="button is-success" :class="{'is-loading':isLoading}">
            Submit
          </button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import FilePicker from '@/components/FilePicker'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'import',
  components: {
    CardComponent,
    FilePicker
  },
  data () {
    return {
      isFileUploaded: false,
      isLoading: false
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'CSV file added',
          queue: false
        })
      }, 500)
    }
  }
}
</script>
