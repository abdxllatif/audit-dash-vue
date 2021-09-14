<template>
  <card-component>
    <form @submit.prevent="submit">
      <b-field horizontal label="importer un fichier CSV">
        <file-picker accept=".csv" v-on:input="read" />
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
import axios from 'axios'

export default {
  name: 'import',
  components: {
    CardComponent,
    FilePicker
  },
  props: {
    link: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isFileUploaded: false,
      isLoading: false,
      file: null
    }
  },
  methods: {
    read (file) {
      console.log('rani hna fl read')
      this.file = file
    },
    submit () {
      if (this.file !== null) {
        this.isLoading = true
        const formData = new FormData()
        formData.append('file', this.file)
        console.log(formData.get('file'))
        axios.post(this.link, formData, { headers: { 'Content-Type': 'multipart/form-data' }, onUploadProgress: this.progressEvent })
          .then(r => {
            console.log('resultats: ' + r)
            this.isLoading = false
            this.$buefy.snackbar.open({
              message: 'fichier CSV ajouté',
              queue: false
            })
          })
          .catch(err => {
            this.$buefy.toast.open({
              message: `Error: ${err.message}`,
              type: 'is-danger'
            })
          })
      } else {
        this.$buefy.toast.open({
          message: 'Veuillez ajouter un fichier',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
