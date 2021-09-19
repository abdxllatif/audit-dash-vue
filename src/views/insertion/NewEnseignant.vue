<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/etudiants" class="button">
        Table des enseignants
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Nouveau enseignant" icon="ballot">
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
          <b-field label="Adresse" horizontal>
              <b-input v-model="form.adresse" placeholder="Adresse" name="Adresse" required />
          </b-field>
          <b-field label="Diplome" horizontal>
            <b-field>
              <b-input v-model="form.diplome" placeholder="Diplome" name="Diplome" required />
            </b-field>
            <b-field>
              <b-input v-model="form.specialite" placeholder="Spécialité" name="Spécialité" required />
            </b-field>
          </b-field>
          <b-field label="Grade" horizontal>
              <b-select placeholder="Selectionne un grade" v-model="form.grade" required>
                <option v-for="(grade, index) in grade" :key="index" :value="grade">
                  {{ grade }}
                </option>
              </b-select>
          </b-field>
          <b-field label="Situation sociale" horizontal>
              <b-select placeholder="Selectionne une situation" v-model="form.sit" required>
                <option v-for="(sit, index) in sit" :key="index" :value="sit">
                  {{ sit }}
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

export default {
  name: 'newEns',
  components: { HeroBar, CardComponent, TitleBar },
  data () {
    return {
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
      grade: [
        'MCA',
        'MCB',
        'MAA',
        'MAB'
      ],
      sit: [
        'Célibataire',
        'Marié',
        'Veuf',
        'Divorcé'
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
      axios.post('http://localhost:8090/api/data/enseignants', {
        nom: this.form.nom,
        prenom: this.form.prenom,
        adresse: this.form.adresse,
        diplome: this.form.diplome,
        lieu_naissance: this.form.LieuNaissance,
        data_naissance: this.form.dateNaissance,
        sex: this.form.sex,
        specialite: this.form.specialite,
        grade: this.form.grade,
        situationSocial: this.form.sit,
        admin: this.$store.state.userEmail
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'enseignant ' + this.form.nom + ' ajouté',
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
