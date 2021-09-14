<template>
  <b-field class="file">
    <b-upload v-model="file" @input="upload" :accept="accept">
      <a class="button is-primary">
        <b-icon icon="upload" custom-size="default"></b-icon>
        <span>{{ buttonLabel }}</span>
      </a>
    </b-upload>
    <span class="file-name" v-if="file">{{ file.name }}</span>
  </b-field>
</template>

<script>
// import axios from 'axios'
// import csvToJson from 'convert-csv-to-json'

export default {
  name: 'FilePicker',
  props: {
    accept: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      file: null,
      uploadPercent: 0
    }
  },
  computed: {
    buttonLabel () {
      return !this.file ? 'Choisir un fichier' : 'Choisir un autre fichier'
    }
  },
  methods: {
    upload (file) {
      console.log(file)
      // const json = csvToJson.getJsonFromCsv(file)
      // console.log(json)
      this.$emit('input', file)
      // Use this as an example for handling file uploads
      // const formData = new FormData()
      // formData.append('file', file)
      // console.log(formData.get('file'))
      /* axios.post('http://localhost:8090/api/data/outils/file', formData, { headers: { 'Content-Type': 'multipart/form-data' }, onUploadProgress: this.progressEvent })
        .then(r => {
          console.log('resultats: ' + r)
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger'
          })
        }) */
    },
    progressEvent (progressEvent) {
      this.uploadPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    }
  }
}
</script>
