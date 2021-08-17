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
              <b-input v-model="form.administratifId" custom-class="is-static" readonly />
            </b-field>
            <hr>
            <b-field label="Nom" message="Nom de l'administratif" horizontal>
              <b-input placeholder="e.g. Beldjelti" v-model="form.nom" required />
            </b-field>
            <b-field label="Prénom" message="Prénom de l'administratif" horizontal>
              <b-input placeholder="e.g. Abdellatif" v-model="form.nom" required />
            </b-field>
            <b-field label="Type" horizontal>
                <b-select placeholder="Type du club" v-model="form.type" required>
                    <option v-for="(type, index) in types" :key="index" :value="type">
                        {{ type }}
                    </option>
                </b-select>
            </b-field>
            <!--<b-field label="Created" horizontal>
              <b-datepicker
                @input="input"
                v-model="form.created_date"
                placeholder="Click to select..."
                icon="calendar-today">
              </b-datepicker>
            </b-field>-->
            <hr>
            <b-field horizontal>
              <b-button type="is-primary" :loading="isLoading" native-type="submit">Submit</b-button>
            </b-field>
          </form>
        </card-component>
        <card-component v-if="isProfileExists" title="Ancien profile du partenaire" icon="account" class="tile is-child">
          <b-field label="Nom">
            <b-input :value="last.nom" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Prénom">
            <b-input :value="last.prenom" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Date et lieu de naissance">
            <b-input :value="getdate(last.data_de_naissance) + ' - ' + last.lieu_naissance" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Adresse">
            <b-input :value="last.adresse" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Sex">
            <b-input :value="last.sex" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Diplome">
            <b-input :value="last.diplome + ' spécialité: ' + last.specialite" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Role">
            <b-input :value="last.role" custom-class="is-static" readonly/>
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
  name: 'administratifEdit',
  components: { CardComponent, Tiles, HeroBar, TitleBar },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      last: Object,
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
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
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.last.nom + ' ' + this.last.prenom
      } else {
        lastCrumb = 'Nouveau administratif'
      }

      return [
        'Admin',
        'Administratif',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.last.nom + ' ' + this.last.prenom
      } else {
        return 'Nouveau administratif'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'newAdm' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nouveau administratif'
      } else {
        return 'Dashboard'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Modifier administratif'
      } else {
        return 'Nouveau administratif'
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getdate: function (t) {
      return dayjs(t).format('DD-MM-YYYY')
    },
    getdateminute: function (t) {
      return dayjs(t).format('DD-MM-YYYY HH:mm')
    },
    getClearFormObject () {
      return {
        id: null,
        name: null,
        company: null,
        city: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null,
        progress: 0
      }
    },
    async getData () {
      if (this.id) {
        await axios
          .get('http://localhost:8080/api/data/administratifs', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.data, item => item.administratifId === parseInt(this.id))

            if (item) {
              // this.last = item
              this.isProfileExists = true
              this.form = item
              // this.last = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(item.created_at).format('DD-MM-YYYY')
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
        await axios.get('http://localhost:8080/api/data/administratifs/' + this.id, { headers: { 'x-access-token': this.$session.get('jwt') } })
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
        alert('nom ' + this.form.nom + ' ' + 'type ' + this.form.type + ' ' + 'updatedAt ' + dayjs.utc().format())
        axios.post('http://localhost:8080/api/data/administratifs/' + this.id, {
          nom: this.form.nom,
          prenom: this.form.prenom,
          type: this.form.type,
          updatedAt: dayjs.utc().format()
        }, { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            this.$buefy.snackbar.open({
              message: this.form.nom + ' Modifié',
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
