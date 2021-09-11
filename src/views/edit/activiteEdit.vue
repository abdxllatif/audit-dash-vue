<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="account-edit" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="ID" horizontal>
              <b-input v-model="form.activiteId" custom-class="is-static" readonly />
            </b-field>
            <hr>
            <b-field label="Titre" message="Titre d'activité" horizontal>
              <b-input placeholder="e.g. Welcome day" v-model="form.titre" required />
            </b-field>
            <b-field label="Type" horizontal>
                <b-select placeholder="Type d'activité" v-model="form.type" required>
                    <option v-for="(type, index) in types" :key="index" :value="type">
                        {{ type }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Responsable" horizontal>
                <b-select placeholder="Responsable d'activité" v-model="form.clubClubId" required>
                    <option v-for="(club, index) in clubs" :key="index" :value="club.clubId">
                        {{ club.nom }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Lieu" horizontal>
                <b-select placeholder="Lieu d'activité" v-model="form.salleSalleId" required>
                    <option v-for="(salle, index) in salles" :key="index" :value="salle.salleId">
                        {{ salle.nom }}
                    </option>
                </b-select>
            </b-field>
            <!--<b-field label="Date début" horizontal>
              <b-datepicker
                @input="input"
                v-model="this.date_debut"
                placeholder="Click to select..."
                icon="calendar-today">
              </b-datepicker>
            </b-field>
            <b-field label="Date fin" horizontal>
              <b-datepicker
                @input="input"
                v-model="this.date_fin"
                placeholder="Click to select..."
                icon="calendar-today">
              </b-datepicker>
            </b-field>-->
            <b-field label="Date début et date fin">
                <b-datepicker
                    placeholder="Click to select..."
                    v-model="dates"
                    range>
                </b-datepicker>
            </b-field>
            <hr>
            <b-field horizontal>
              <b-button type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
            </b-field>
          </form>
        </card-component>
        <card-component v-if="isProfileExists" title="Ancien profile d'activité" icon="account" class="tile is-child">
          <b-field label="Titre">
            <b-input :value="last.titre" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Type">
            <b-input :value="last.type" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Lieu">
            <b-input :value="last.salleSalleId" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Responsable">
            <b-input :value="last.clubClubId" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Date du début">
            <b-input :value="getdateminute(last.date_debut)" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Date de fin">
            <b-input :value="getdateminute(last.date_fin)" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Date de création">
            <b-input :value="getdateminute(last.createdAt)" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Date de la derniere modification">
            <b-input :value="getdateminute(last.updatedAt)" custom-class="is-static" readonly/>
          </b-field>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import find from 'lodash/find'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'activiteEdit',
  components: { CardComponent, Tiles, HeroBar, TitleBar },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      date_debut: new Date(),
      date_fin: new Date(),
      last: Object,
      isLoading: false,
      form: Object,
      createdReadable: null,
      isProfileExists: false,
      types: [
        'scientifique',
        'culturel',
        'autre'
      ],
      salles: [],
      clubs: [],
      dates: []
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.last.titre
      } else {
        lastCrumb = 'Nouvelle activité'
      }

      return [
        'Admin',
        'Activité',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.last.titre
      } else {
        return 'Nouvelle activité'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'newActivite' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nouvelle activité'
      } else {
        return 'Dashboard'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Modifier acitivité'
      } else {
        return 'Nouvelle activité'
      }
    }
  },
  async created () {
    axios.get('http://localhost:8090/api/data/salles', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.salles = this.listings.results
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('http://localhost:8090/api/data/clubs', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.clubs = this.listings.results
      })
      .catch((error) => {
        console.log(error)
      })
    await this.getData()
    console.log(dayjs(this.date_debut).format('YYYY-MM-DD'))
  },
  methods: {
    getdate: function (t) {
      return dayjs(t).format('DD-MM-YYYY')
    },
    getdates: function (t) {
      return dayjs(t).format('DD/MM/YYYY')
    },
    getdateminute: function (t) {
      return dayjs(t).format('DD-MM-YYYY HH:mm')
    },
    async getData () {
      if (this.id) {
        await axios
          .get('http://localhost:8090/api/data/activites', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.activiteId === parseInt(this.id))

            if (item) {
              // this.last = item
              this.isProfileExists = true
              this.form = item
              // this.last = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(item.created_at).format('DD-MM-YYYY')
              this.dates = [new Date(this.form.date_debut), new Date(this.form.date_fin)]
              this.date_debut = new Date(this.form.date_debut)
              this.date_fin = new Date(this.form.date_fin)
            } else {
              this.$router.push({ name: '404' })
            }
          })
          .catch(e => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
        await axios.get('http://localhost:8090/api/data/activites/' + this.id, { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            console.log('Last:')
            console.log(r.data.data)
            this.last = r.data.data
          })
          .catch(e => {
            alert(e)
          })
      }
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        const utc = require('dayjs/plugin/utc')
        dayjs.extend(utc)
        // console.log(dayjs(this.date_debut).format())
        // console.log(dayjs(this.date_debut).format('YYYY-MM-DD HH:mm:ss.SSSZ'))
        console.log(this.dates[1])
        axios.post('http://localhost:8090/api/data/activites/' + this.id, {
          titre: this.form.titre,
          type: this.form.type,
          date_debut: dayjs(this.dates[0]).format('YYYY-MM-DD HH:mm:ss.SSSZ'),
          date_fin: dayjs(this.dates[1]).format('YYYY-MM-DD HH:mm:ss.SSSZ'),
          salleId: this.form.salleSalleId,
          clubId: this.form.clubClubId,
          admin: this.$store.state.userEmail
        }, { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            this.$buefy.snackbar.open({
              message: this.form.titre + ' Modifié',
              queue: false
            })
            this.getData()
          })
          .catch(e => {
            this.$buefy.snackbar.open({
              message: e,
              queue: false
            })
          })
      }, 500)
    }
  }
  /* watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
      } else {
        this.getData()
      }
    }
  } */
}
</script>
