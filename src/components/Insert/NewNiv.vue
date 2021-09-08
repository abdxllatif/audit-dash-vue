<template>
    <section class="section is-main-section">
        <form @submit.prevent="submit">
          <b-field label="Nouveau" horizontal>
            <b-field>
              <b-input icon="account" v-model="form.name" placeholder="Nom" name="name" required />
            </b-field>
            <b-field>
              <b-input placeholder="Description" v-model="form.description" required/>
            </b-field>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Ajouter</b-button>
              </div>
          </b-field>
        </form>
    </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'newNiv',
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        description: null
      }
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      axios.post('http://localhost:8090/api/data/niveaux', {
        titre: this.form.name,
        desc: this.form.description,
        Durée: this.form.duree,
        formationId: this.trash
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'le niveau ' + this.form.name + ' ajouté',
            queue: false
          })
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          this.$buefy.snackbar.open({
            type: 'is-warning',
            message: "Erreur d'insertion",
            queue: false
          })
        })
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    }
  }
}
</script>
