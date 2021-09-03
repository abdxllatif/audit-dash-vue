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
        <b-tabs>
            <b-tab-item label="Détail générale" icon="google-photos">
                <card-component v-if="isProfileExists" title="Détail du module" icon="account" class="tile is-child">
                    <b-field label="ID" horizontal>
                        <b-input v-model="form.matiereId" custom-class="is-static" readonly />
                    </b-field>
                    <b-field label="Nom" horizontal>
                        <b-input :value="form.nom" custom-class="is-static" readonly/>
                    </b-field>
                    <b-field label="Type" horizontal>
                        <b-input :value="form.type" custom-class="is-static" readonly/>
                    </b-field>
                    <b-field label="UE" horizontal>
                        <attribut-table :id="form.ueUeId" :dataUrl="'http://localhost:8080/api/data/ues/'" :att="'nom'" ></attribut-table>
                    </b-field>
                </card-component>
            </b-tab-item>
            <b-tab-item label="Etudiants" icon="account">
                <etud-delib-table v-if="this.yes" :matiereId="form.matiereId" :listetudiants="this.listetudiants" :data-url="`http://localhost:8080/api/stats/data`"></etud-delib-table>
            </b-tab-item>
        </b-tabs>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import find from 'lodash/find'
import HeroBar from '@/components/HeroBar'
import CardComponent from '@/components/CardComponent'
import EtudDelibTable from '@/components/TableWhere/EtudDelibTable.vue'
import AttributTable from '@/components/Tables/Adds/AttributTable'

export default {
  name: 'DelibDetail',
  components: { CardComponent, HeroBar, EtudDelibTable, AttributTable },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      listetudiants: [],
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
      yes: false
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Module',
        this.form.nom
      ]
    },
    heroTitle () {
      return 'Détails du module ' + this.form.nom
    },
    heroRouterLinkTo () {
      return { name: 'newNiveau' }
    },
    heroRouterLinkLabel () {
      return 'Nouveau niveau'
    }
  },
  created () {
    console.log('dkhalt bs7 tnkt ' + this.id)
    this.getData()
  },
  methods: {
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
          .get('http://localhost:8080/api/data/matieres', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.matiereId === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
              axios
                .get('http://localhost:8080/api/data/ues/' + this.form.ueUeId, { headers: { 'x-access-token': this.$session.get('jwt') } })
                .then(r2 => {
                  console.log(r2.data.data)
                  axios
                    .get('http://localhost:8080/api/data/semestres/' + r2.data.data.semestreSemestreId, { headers: { 'x-access-token': this.$session.get('jwt') } })
                    .then(r2 => {
                      console.log(r2.data.data)
                      axios
                        .post('http://localhost:8080/api/stats/data', {
                          table: 'etudiant_niveauxes',
                          fk: 'niveauId',
                          value: r2.data.data.niveauxNiveauId
                        }, { headers: { 'x-access-token': this.$session.get('jwt') } })
                        .then(r2 => {
                          console.log(r2.data)
                          this.listetudiants = r2.data
                          this.yes = true
                        })
                        .catch(e => {
                          this.isLoading = false
                          this.$buefy.toast.open({
                            message: `Error: ${e.message}`,
                            type: 'is-danger'
                          })
                        })
                    })
                    .catch(e => {
                      this.isLoading = false
                      this.$buefy.toast.open({
                        message: `Error: ${e.message}`,
                        type: 'is-warning'
                      })
                    })
                })
                .catch(e => {
                  this.isLoading = false
                  this.$buefy.toast.open({
                    message: `Error: ${e.message}`,
                    type: 'is-warning'
                  })
                })
            } else {
              this.$router.push({ name: '404' })
            }
          })
          .catch(e => {
            this.$buefy.toast.open({
              message: `Error: ${e.message + 'its me'}`,
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
