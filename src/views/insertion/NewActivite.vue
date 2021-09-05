<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/tables/activites" class="button">
        Table des activités
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <!--<import-component/>-->
      <card-component title="Nouvelle activité" icon="ballot">
        <form @submit.prevent="submit">
            <b-field label="Organisateur" horizontal>
                <b-select placeholder="Selectionne un organisateur" v-model="form.club" required>
                    <option v-for="(club, index) in clubs" :key="index" :value="club">
                        {{ club.nom }}
                    </option>
                </b-select>
            </b-field>
          <b-field label="Titre" horizontal>
            <b-field>
              <b-input icon="account" v-model="form.titre" placeholder="Titre de l'activité" name="titre" required />
            </b-field>
          </b-field>
          <b-field label="Type" horizontal>
              <b-select placeholder="Selectionne un type" v-model="form.type" required>
                    <option v-for="(type, index) in types" :key="index" :value="type">
                        {{ type }}
                    </option>
              </b-select>
          </b-field>
          <b-field  label="Période" horizontal>
            <!--<b-field label="Date de début">
              <b-datepicker ref="datepicker" expanded placeholder="Selectionner une date" v-model="form.dateDebut" required></b-datepicker>
            </b-field>
            <b-field label="Date de fin">
              <b-datepicker ref="datepicker" placeholder="Selectionner une date" v-model="form.dateFin" required></b-datepicker>
            </b-field>-->
                <b-datepicker
                    placeholder="Click to select..."
                    v-model="dates"
                    range>
                </b-datepicker>
          </b-field>
          <b-field label="Salle principale" horizontal>
                <b-select placeholder="Selectionne une salle" v-model="form.salle" required>
                    <option v-for="(salle, index) in salles" :key="index" :value="salle">
                        {{ salle.nom }}
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
  name: 'newActivite',
  components: { HeroBar, CardComponent, TitleBar },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        description: null
      },
      clubs: [],
      salles: [],
      dates: [],
      types: [
        'Scientifique',
        'Culturelle',
        'Sportive',
        'Autres'
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
  created () {
    axios.get('http://localhost:8090/api/data/clubs', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.clubs = this.listings.results
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('http://localhost:8090/api/data/salles', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.salles = this.listings.results
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    submit () {
      this.isLoading = true
      axios.post('http://localhost:8090/api/data/activites', {
        titre: this.form.titre,
        clubId: this.form.club.clubId,
        type: this.form.type,
        date_debut: this.dates[0],
        date_fin: this.dates[1],
        salleId: this.form.salle.salleId
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: "l'activité " + this.form.titre + ' bien ajoutée',
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
