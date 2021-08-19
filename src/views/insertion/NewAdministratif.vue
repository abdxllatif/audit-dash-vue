<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/administratifs" class="button">
        Table des administratifs
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Nouveau administratif" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Départment" horizontal>
            <b-select placeholder="Selectionne un départment" v-model="form.department" required>
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department.nom }}
              </option>
            </b-select>
          </b-field>
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
              <b-input v-model="form.lieuNaissance" placeholder="Lieu de naissance" required />
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
          <b-field label="Diplome" horizontal>
            <b-select placeholder="Selectionne une diplome" v-model="form.diplome" required expanded>
              <option v-for="(diplome, index) in diplomes" :key="index" :value="diplome">
                {{ diplome }}
              </option>
            </b-select>
            <b-input v-model="form.specialite" placeholder="Spécialité" name="Spécialité" required expanded/>
          </b-field>
          <b-field label="Role" horizontal>
              <b-input v-model="form.role" placeholder="Role" name="Role" required />
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
import wilayas from '../../../public/data-sources/algeria_cities.json'

export default {
  name: 'newAdm',
  components: { HeroBar, CardComponent, TitleBar },
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
      ],
      diplomes: [
        'Sans diplome',
        'BAC',
        'TS: Technicien Superieur',
        'BTS: Brevet Technicien Superieur',
        'Licence',
        'Master 1',
        'Master 2',
        "Ingenieur d'état",
        'Doctorat',
        'Professeur',
        'Autres'
      ]
    }
  },
  created () {
    axios.get('http://localhost:8080/api/data/departements', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.$session.set('depTable', this.listings.results)
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
        'Administratif'
      ]
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      axios.post('http://localhost:8080/api/data/administratifs', {
        nom: this.form.nom,
        prenom: this.form.prenom,
        date_naissance: this.form.dateNaissance,
        lieu_naissance: this.form.lieuNaissance,
        adresse: this.form.adresse,
        diplome: this.form.diplome,
        specialite: this.form.specialite,
        role: this.form.role,
        sex: this.form.sex,
        depId: this.form.department.departementId
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'administratif: ' + this.form.nom + ' ajouté',
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
