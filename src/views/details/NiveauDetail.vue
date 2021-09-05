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
                <card-component v-if="isProfileExists" title="Détail du niveau" icon="account" class="tile is-child">
                    <b-field label="ID" horizontal>
                        <b-input v-model="form.niveauId" custom-class="is-static" readonly />
                    </b-field>
                    <b-field label="Nom" horizontal>
                        <b-input :value="form.nom" custom-class="is-static" readonly/>
                    </b-field>
                    <b-field label="Formation" horizontal>
                        <attribut-table :id="form.formationFormationId" :dataUrl="'http://localhost:8090/api/data/formations/'" :att="'nom'" ></attribut-table>
                    </b-field>
                </card-component>
            </b-tab-item>
            <b-tab-item label="Semestres" icon="video">
                <b-tabs>
                    <b-tab-item label="Semestre1">
                        <u-e-table v-if="this.yes" :id="this.form.semestre1" :data-url="`http://localhost:8090/api/stats/data`"></u-e-table>
                    </b-tab-item>
                    <b-tab-item label="Semestre 2">
                        <u-e-table v-if="this.yes" :id="this.form.semestre2" :data-url="`http://localhost:8090/api/stats/data`"></u-e-table>
                    </b-tab-item>
                </b-tabs>
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
import UETable from '@/components/TableWhere/UETable.vue'
import AttributTable from '@/components/Tables/Adds/AttributTable'

export default {
  name: 'NiveauDetail',
  components: { CardComponent, HeroBar, UETable, AttributTable },
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
      yes: false
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Formation',
        this.form.nom
      ]
    },
    heroTitle () {
      return 'Détails du niveau ' + this.form.nom
    },
    heroRouterLinkTo () {
      return { name: 'newNiveau' }
    },
    heroRouterLinkLabel () {
      return 'Nouveau niveau'
    }
  },
  created () {
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
          .get('http://localhost:8090/api/data/niveaux', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.niveauId === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
              axios
                .post('http://localhost:8090/api/stats/data', {
                  table: 'semestres',
                  fk: 'niveauxNiveauId',
                  value: this.form.niveauId
                }, { headers: { 'x-access-token': this.$session.get('jwt') } })
                .then(r2 => {
                  console.log(r2)
                  this.form.semestre1 = r2.data[0].SemestreId
                  console.log('semestre 1' + r2.data[0].SemestreId)
                  this.form.semestre2 = r2.data[1].SemestreId
                  console.log('semestre 2' + r2.data[1].SemestreId)
                  this.yes = true
                })
                .catch(e => {
                  this.isLoading = false
                  this.$buefy.toast.open({
                    message: `Error: ${e.message + 'ra7t fi zabi'}`,
                    type: 'is-danger'
                  })
                })
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
