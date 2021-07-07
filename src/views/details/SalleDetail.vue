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
        <b-tab-item label="Profil de la salle" icon="account">
          <b-field label="ID" horizontal>
              <b-input v-model="form.salleId" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Nom" horizontal>
            <b-input :value="form.nom" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Type" horizontal>
            <b-input :value="form.type" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Capacité" horizontal>
            <b-input :value="form.capacite" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Département" horizontal>
            <b-input :value="dep" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Created" horizontal>
            <b-input :value="form.createdAt" custom-class="is-static" readonly/>
          </b-field>
        </b-tab-item>
        <b-tab-item label="équipements" icon="account">
          <card-component v-if="isProfileExists" title="Outils" icon="tools" class="tile is-child">
            <outil-table :data-url="`http://localhost:8080/api/data/outils/salles/`" :id="parseInt(this.id)"/>
          </card-component>
        </b-tab-item>
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
import outilTable from '@/components/TableWhere/OutilTable.vue'

export default {
  name: 'SalleDetail',
  components: { CardComponent, HeroBar, TitleBar, outilTable },
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
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.nom
      } else {
        lastCrumb = 'New client'
      }

      return [
        'Admin',
        'Salle',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return 'Détails de la salle ' + this.form.nom
      } else {
        return 'Create Client'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'newSalle' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nouvelle salle'
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
          .get('http://localhost:8080/api/data/salles', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.salleId === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
              axios.get('http://localhost:8080/api/data/departements/' + this.form.departementDepartementId, { headers: { 'x-access-token': this.$session.get('jwt') } })
                .then(r => {
                  this.dep = r.data.data.nom
                })
                .catch(e => {
                  this.$buefy.toast.open({
                    message: 'yewedi',
                    type: 'is-danger',
                    queue: false
                  })
                })
            } else {
              this.$router.push({ name: 'client.new' })
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
