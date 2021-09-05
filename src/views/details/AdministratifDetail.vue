<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="{ name: 'newAdm' }" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <b-tabs>
            <b-tab-item label="Profil de l'administratif" icon="account-details">
                <b-field label="ID" horizontal>
                  <b-input v-model="form.administratifId" custom-class="is-static" readonly />
                </b-field>
                <b-field label="Nom" horizontal>
                  <b-input :value="form.nom" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Prénom" horizontal>
                  <b-input :value="form.prenom" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Date et lieu de naissance" horizontal>
                  <b-input :value="getdate(form.data_de_naissance) + ' - ' + form.lieu_naissance" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Adresse" horizontal>
                  <b-input :value="form.adresse" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Sex" horizontal>
                  <b-input :value="form.sex" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Diplome" horizontal>
                  <b-input :value="form.diplome + ' spécialité: ' + form.specialite" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Role" horizontal>
                  <b-input :value="form.role" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Département" horizontal>
                    <attribut-table :id="this.dep" :dataUrl="'http://localhost:8090/api/data/departements/'" att="nom" ></attribut-table>
                  <b-input :value="form.departementDepartementId" custom-class="is-static" readonly/>
                </b-field>
            </b-tab-item>
            <b-tab-item label="..."></b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import find from 'lodash/find'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
// import CardComponent from '@/components/CardComponent'
import AttributTable from '@/components/Tables/Adds/AttributTable'

export default {
  name: 'AdministratifDetail',
  components: { HeroBar, TitleBar, AttributTable },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
      dep: ''
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Administratifs',
        this.form.nom + ' ' + this.form.prenom
      ]
    },
    heroTitle () {
      return "Détails de l'administratif " + this.form.nom
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nouveau administratif'
      } else {
        return 'Dashboard'
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
    getData () {
      if (this.id) {
        axios
          .get('http://localhost:8090/api/data/administratifs', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.data, item => item.administratifId === parseInt(this.id))

            if (item) {
              console.log(item)
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
              this.dep = item.departementDepartementId
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
      }
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Demo only',
          queue: false
        })
      }, 500)
    }
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
      } else {
        this.getData()
      }
    }
  }
}
</script>
