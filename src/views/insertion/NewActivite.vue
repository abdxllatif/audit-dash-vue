<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/clubs" class="button">
        Table des activités
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <import-component/>
      <card-component title="Nouvelle activité" icon="ballot">
        <form @submit.prevent="submit">
            <b-field label="Organisateur" horizontal>
                <b-select placeholder="Selectionne un organisateur" v-model="form.type" required>
                    <option v-for="(type, index) in types" :key="index" :value="type">
                        {{ type }}
                    </option>
                </b-select>
            </b-field>
          <b-field label="Titre" horizontal>
            <b-field>
              <b-input icon="account" v-model="form.name" placeholder="Titre de l'activité" name="name" required />
            </b-field>
          </b-field>
          <b-field label="Description" message="Ne pas dépasser 255 caractères" horizontal>
            <b-input type="textarea" placeholder="Une petite description de l'activité" v-model="form.description" maxlength="255" required/>
          </b-field>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Ajouter</b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import ImportComponent from '@/components/ImportComponent'
import axios from 'axios'

export default {
  name: 'newActivite',
  components: { HeroBar, CardComponent, TitleBar, ImportComponent },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        description: null
      },
      types: [
        'Alphabit Club',
        'Ingeniums Club',
        'DSC ESI SBA',
        'Administration'
      ]
    }
  },
  computed: {
    titleStack () {
      return [
        'Insertion',
        'Activité'
      ]
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      axios.post('http://localhost:8080/api/data/activites', {
        nom: this.form.name,
        description: this.form.description
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'le département ' + this.form.name + ' ajouté',
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
