<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/salles" class="button">
        Table des salles
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <import-component/>
      <card-component title="Nouvelle salle" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Départment" horizontal>
            <b-select v-if="$route.params.sel==null" placeholder="Selectionne un départment" v-model="form.department" required>
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department.nom }}
              </option>
            </b-select>
            <b-input v-if="$route.params.sel!=null" v-model="$route.params.sel.nom" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Nom de la salle" horizontal>
            <b-field>
              <b-input icon="account" v-model="form.name" placeholder="identifiant de la salle" name="name" required />
            </b-field>
          </b-field>
          <b-field label="Capacité de la salle" horizontal>
              <b-input icon="account-multiple" v-model="form.capacite" placeholder="Capacité" name="capacite" required />
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
import ImportComponent from '@/components/ImportComponent'
import axios from 'axios'

export default {
  name: 'newSalle',
  components: { HeroBar, CardComponent, TitleBar, ImportComponent },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        capacite: 0,
        department: null
      },
      types: [
        'Amphi',
        'Salle TP',
        'Salle TD',
        'Bureau',
        'Autres'
      ],
      departments: []
    }
  },
  created () {
    axios.get('http://localhost:8080/api/data/departements', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.departments = this.listings.results
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    titleStack () {
      return [
        'Insertion',
        'Salle'
      ]
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      if (this.$route.params.sel != null) {
        this.form.department = this.$route.params.sel
      }
      axios.post('http://localhost:8080/api/data/salles', {
        nom: this.form.name,
        description: this.form.type,
        capacite: this.form.capacite,
        departementId: this.form.department.departementId
        // departementId: this.$route.params.sel.departementId
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'la salle ' + this.form.name + ' bien ajoutée',
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
