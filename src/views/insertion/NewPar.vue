<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/partenaire" class="button">
        Table des partenaires
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Nouveau partenaire" icon="ballot">
        <form @submit.prevent="submit">
            <b-field label="Type" horizontal>
                <b-select placeholder="Selectionne un type" v-model="form.type" required>
                    <option v-for="(type, index) in types" :key="index" :value="type">
                        {{ type }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Nom du partenaire" horizontal>
              <b-input icon="account" v-model="form.name" placeholder="Nom du partenaire" name="name" required />
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
import axios from 'axios'

export default {
  name: 'newDep',
  components: { HeroBar, CardComponent, TitleBar },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        description: null
      },
      types: [
        'SocioEconomique',
        'Pédagogique'
      ]
    }
  },
  computed: {
    titleStack () {
      return [
        'Insertion',
        'Partenaire'
      ]
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      axios.post('http://localhost:8090/api/data/partenaire', {
        nom: this.form.name,
        type: this.form.type,
        admin: this.$store.state.userEmail
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'le partenaire ' + this.form.name + ' ajouté',
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
