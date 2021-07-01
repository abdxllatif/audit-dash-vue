<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="{ name: 'newForm', params: { selDep: this.department }}" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component v-if="isProfileExists" title="Profil du formation" icon="account" class="tile is-child">
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
        </card-component>
        <card-component v-if="isProfileExists" title="Niveaux" icon="account" class="tile is-child">
          <niveaux-table :data-url="`http://localhost:8080/api/data/niveaux`"/>
                <section>
                    <b-collapse
                        class="card"
                        animation="slide"
                        :open="isOpen == !index"
                        @open="isOpen = index">
                        <template #trigger="props">
                            <div
                                class="card-header"
                                role="button"
                            >
                                <p class="card-header-title">
                                    nouveau niveau
                                </p>
                                <a class="card-header-icon">
                                    <b-icon
                                        :icon="props.open ? 'menu-down' : 'menu-up'">
                                    </b-icon>
                                </a>
                            </div>
                        </template>
                        <div class="card-content">
                            <div class="content">
                                text
                            </div>
                        </div>
                    </b-collapse>
                </section>
        </card-component>
      </tiles>
      <tiles>
        <card-component v-if="isProfileExists" title="Partenaires" icon="account" class="tile is-child">
            <par-table :data-url="`http://localhost:8080/api/data/partenaires`"/>
        </card-component>
        <card-component v-if="isProfileExists" title="Enseignants" icon="account" class="tile is-child">
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
import ParTable from '@/components/Tables/ParTable.vue'
// import EtudiantTable from '@/components/Tables/EtudiantTable.vue'
import NiveauxTable from '@/components/Tables/NiveauxTable.vue'

export default {
  name: 'FormationDetail',
  components: { CardComponent, Tiles, HeroBar, TitleBar, ParTable, NiveauxTable },
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
          .get('http://localhost:8080/api/data/formations', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.formationId === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
              axios.get('http://localhost:8080/api/data/departements/' + this.form.departementDepartementId, { headers: { 'x-access-token': this.$session.get('jwt') } })
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
