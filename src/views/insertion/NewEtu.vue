<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/etudiants" class="button">
        Table des étudiants
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <import-component link="http://localhost:8090/api/data/etudiants/file"/>
      <card-component title="Nouveau étudiant" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Nom et prénom" horizontal>
            <b-field>
              <b-input icon="account" v-model="form.nom" placeholder="Nom" name="nom" required />
            </b-field>
            <b-field>
              <b-input icon="account" v-model="form.prenom" placeholder="Prénom" name="prenom" required />
            </b-field>
          </b-field>
          <b-field label="Naissance" horizontal>
            <b-field>
              <b-datepicker ref="datepicker" expanded placeholder="Selectionner une date" v-model="form.dateNaissance" required></b-datepicker>
            </b-field>
            <b-field>
              <b-input v-model="form.LieuNaissance" placeholder="Lieu de naissance" required />
            </b-field>
          </b-field>
          <b-field label="Sex" horizontal>
            <b-select placeholder="Selectionne un sex" v-model="form.sex" required>
              <option v-for="(sex, index) in sex" :key="index" :value="sex">
                {{ sex }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Résidence" horizontal>
            <b-select placeholder="Selectionne une wilaya" v-model="form.adresse" required>
              <option v-for="(wilaya, index) in wilayas" :key="index" :value="wilaya.name">
                {{ wilaya.code + ': ' + wilaya.name }}
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
import axios from 'axios'
import ImportComponent from '@/components/ImportComponent'
import wilayas from '../../../public/data-sources/algeria_cities.json'

export default {
  name: 'newEtu',
  components: { HeroBar, CardComponent, TitleBar, ImportComponent },
  data () {
    return {
      wilayas: wilayas,
      isLoading: false,
      form: {
        department: null,
        titre: null,
        description: null
      },
      departments: this.$session.get('depTable'),
      sex: [
        'Homme',
        'Femme'
      ]
    }
  },
  created () {
  },
  computed: {
    titleStack () {
      return [
        'Insertion',
        'Etudiant'
      ]
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      axios.post('http://localhost:8090/api/data/etudiants', {
        nom: this.form.titre,
        prenom: this.form.description,
        data_naissance: this.form.dateNaissance,
        lieu_naissance: this.form.LieuNaissance,
        adresse: this.form.adresse,
        Sex: this.form.sex,
        admin: this.$store.state.userEmail
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'étudiant ' + this.form.nom + ' ajouté',
            queue: false
          })
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          /* this.$buefy.snackbar.open({
            type: 'is-warning',
            message: "Erreur d'insertion",
            queue: false
          }) */
        })
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    }
  }
}
</script>
