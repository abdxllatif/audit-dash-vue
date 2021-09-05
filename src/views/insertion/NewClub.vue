<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/clubs" class="button">
        Table des clubs
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <!--<import-component/>-->
      <card-component title="Nouveau club" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Nom du club" horizontal>
            <b-field>
              <b-input icon="account" v-model="form.name" placeholder="Nom du club" name="name" required />
            </b-field>
          </b-field>
          <b-field label="Type" horizontal>
                <b-select placeholder="Selectionne un type" v-model="form.type" required>
                    <option v-for="(type, index) in types" :key="index" :value="type">
                        {{ type }}
                    </option>
                </b-select>
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
// import ImportComponent from '@/components/ImportComponent'
import axios from 'axios'

export default {
  name: 'newClub',
  components: { HeroBar, CardComponent, TitleBar },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        type: null
      },
      types: [
        'Scientifique',
        'Culturel',
        'Scietifique et culturel',
        'autre'
      ]
    }
  },
  computed: {
    titleStack () {
      return [
        'Insertion',
        'Club'
      ]
    }
  },
  methods: {
    submit () {
      console.log(this.form.type)
      this.isLoading = true
      axios.post('http://localhost:8090/api/data/clubs', {
        nom: this.form.name,
        description: this.form.type
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'le club ' + this.form.name + ' ajouté',
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
