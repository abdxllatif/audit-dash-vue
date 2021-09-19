<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/formation" class="button">
        Table des formations
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Nouvelle formation" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Départment" horizontal>
            <b-select v-if="$route.params.sel==null" placeholder="Selectionne un départment" v-model="form.department" required>
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department.nom }}
              </option>
            </b-select>
            <b-input v-if="$route.params.sel!=null" v-model="$route.params.sel.nom" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Titre" message="Titre de la formation" horizontal>
            <b-input placeholder="e.g. ingenieur des systèmes informatiques" v-model="form.titre" required />
          </b-field>
          <b-field label="Description" message="Ne pas dépasser 255 caractères" horizontal>
            <b-input type="textarea" placeholder="Une petite définition de la formation" v-model="form.description" maxlength="255" required/>
          </b-field>
          <b-field label="Durée" message="Durée en ans [1..10]" horizontal>
            <b-input placeholder="e.g. 3" type="number" min="1" max="10" v-model="form.duree" required></b-input>
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
  name: 'newForm',
  components: { HeroBar, CardComponent, TitleBar },
  data () {
    return {
      isLoading: false,
      form: {
        department: null,
        titre: null,
        description: null
      },
      departments: [],
      sel: this.$route.params.sel,
      departId: ''
    }
  },
  created () {
    axios.get('http://localhost:8090/api/data/departements', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.departments = this.listings.results
        this.$session.set('depTable', this.listings.results)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    titleStack () {
      return [
        'Insertion',
        'Formation'
      ]
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      if (this.sel == null) {
        this.departId = this.form.department.departementId
      } else {
        this.departId = this.sel.departementId
      }
      axios.post('http://localhost:8090/api/data/formations', {
        nom: this.form.titre,
        description: this.form.description,
        departementId: this.departId, // this.form.department.departementId // this.sel.departementId
        admin: this.$store.state.userEmail
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'la formation ' + this.form.titre + ' ajouté',
            queue: false
          })
          console.log(response.data.data.formationId)
          for (let i = 0; i < (this.form.duree); i++) {
            let k = i + 1
            axios.post('http://localhost:8090/api/data/niveaux', {
              nom: 'niveau ' + k,
              desc: 'desc',
              Durée: 1,
              formationId: response.data.data.formationId,
              admin: this.$store.state.userEmail
            }, { headers: { 'x-access-token': this.$session.get('jwt') } })
              .then(response2 => {
                console.log(response2)
                for (let j = 0; j < (2); j++) {
                  k = j + 1
                  axios.post('http://localhost:8090/api/data/semestres', {
                    numero: 'semestre ' + k,
                    desc: 'desc',
                    niveauId: response2.data.data.niveauId,
                    admin: this.$store.state.userEmail
                  }, { headers: { 'x-access-token': this.$session.get('jwt') } })
                    .then(response3 => {
                      console.log(response3)
                    })
                    .catch(e3 => {
                      console.log(e3)
                    })
                }
              })
              .catch(e2 => {
                console.log(e2)
              })
          }
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
