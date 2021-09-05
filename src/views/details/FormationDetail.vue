<template>
  <div>
    <modal-form-par :is-active="isFormParModalActive" :formId="this.id" @confirm="FormParConfirm"
               @cancel="FormParCancel"/>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="{ name: 'newForm', params: { sels: this.department }}" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <b-tabs>
            <b-tab-item label="Profil de la formation" icon="google-photos">
                <b-field label="ID" horizontal>
                  <b-input v-model="form.formationId" custom-class="is-static" readonly />
                </b-field>
                <b-field label="Nom" horizontal>
                  <b-input :value="form.nom" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Description" horizontal>
                  <b-input :value="form.description" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Département" horizontal>
                  <b-input :value="dep" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Created" horizontal>
                  <b-input :value="createdReadable" custom-class="is-static" readonly/>
                </b-field>
            </b-tab-item>
            <b-tab-item label="Niveaux">
              <card-component v-if="isProfileExists" title="Niveaux" icon="account" class="tile is-child">
                <niveaux-table :data-url="`http://localhost:8090/api/stats/data`" :id="this.form.formationId"/>
              </card-component>
            </b-tab-item>
            <b-tab-item label="Partenaires">
              <card-component v-if="isProfileExists" title="Partenaires" icon="account" class="tile is-child" vers-title="Nouveau" todo="ModalNewPartenaire" @doit="FormParModal">
                <par-table :data-url="`http://localhost:8090/api/data/formations/partenaires/`" :id="this.id"/>
              </card-component>
            </b-tab-item>
            <b-tab-item label="Enseignants">
              <card-component v-if="isProfileExists" title="Partenaires" icon="account" class="tile is-child" vers-title="Nouveau" todo="ModalNewPartenaire" @doit="FormParModal">
                <ens-table :data-url="`http://localhost:8090/api/data/formations/partenaires/`" :id="this.id"/>
              </card-component>
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
import CardComponent from '@/components/CardComponent'
import ParTable from '@/components/TableWhere/ParByFormTable'
import EnsTable from '@/components/TableWhere/EnsByFormTable'
// import EtudiantTable from '@/components/Tables/EtudiantTable.vue'
import NiveauxTable from '@/components/Tables/NiveauxTable.vue'
import ModalFormPar from '@/components/ModalBox/ModalFormPar.vue'

export default {
  name: 'FormationDetail',
  components: { CardComponent, HeroBar, TitleBar, ParTable, NiveauxTable, ModalFormPar, EnsTable },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isFormParModalActive: false,
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
        this.dep,
        this.depid,
        this.form.nom
      ]
    },
    heroTitle () {
      return 'Détails de la formation ' + this.form.nom
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nouvelle formation'
      } else {
        return 'Dashboard'
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    FormParModal () {
      this.isFormParModalActive = true
    },
    FormParConfirm () {
      this.isFormParModalActive = false
      // this.$refs.outilTable.mounted
    },
    FormParCancel () {
      this.isFormParModalActive = false
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
          .get('http://localhost:8090/api/data/formations', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.formationId === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
              axios.get('http://localhost:8090/api/data/departements/' + this.form.departementDepartementId, { headers: { 'x-access-token': this.$session.get('jwt') } })
                .then(r => {
                  this.department = r.data.data
                  this.dep = r.data.data.nom
                  this.depid = r.data.data.departementId
                })
                .catch(e => {
                  this.$buefy.toast.open({
                    message: 'yewedi',
                    type: 'is-danger',
                    queue: false
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
