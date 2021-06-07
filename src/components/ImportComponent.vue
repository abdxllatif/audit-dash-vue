<template>
  <card-component>
    <form @submit.prevent="submit">
      <b-field horizontal label="importer un fichier CSV">
        <file-picker/>
        <b-field class="is-right" horizontal>
          <div class="control">
            <button type="submit" class="button is-success" :class="{'is-loading':isLoading}">
              Ajouter
            </button>
          </div>
        </b-field>
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
