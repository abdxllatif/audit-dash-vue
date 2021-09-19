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
        <b-tab-item label="Profil du département" icon="information-outline">
            <b-field label="ID" horizontal>
                <b-input v-model="form.departementId" custom-class="is-static" readonly />
            </b-field>
            <b-field label="Nom" horizontal>
              <b-input :value="form.nom" custom-class="is-static" readonly/>
            </b-field>
            <b-field label="Created" horizontal>
              <b-input :value="form.createdAt" custom-class="is-static" readonly/>
            </b-field>
            <b-field label="Nombre de formations" horizontal>
              <b-input :value="this.FormCount" custom-class="is-static" readonly/>
            </b-field>
        </b-tab-item>
        <b-tab-item label="Formation" icon="school">
          <card-component v-if="isProfileExists" v-bind:selected="this.form" vers-title="nouveau" vers="newForm" title="Formations" icon="account">
              <formation-table :data-url="`http://localhost:8090/api/stats/data`" :id="parseInt(this.id)"/>
          </card-component>
        </b-tab-item>
        <b-tab-item label="Les salles" icon="table">
          <card-component v-if="isProfileExists" v-bind:selected="this.form" vers="newSalle" vers-title="nouveau" title="Salles" icon="account">
              <salle-table :data-url="`http://localhost:8090/api/stats/data`" :id="parseInt(this.id)"/>
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
import FormationTable from '@/components/TableWhere/FormationTable.vue'
import salleTable from '@/components/TableWhere/SalleTable.vue'

export default {
  name: 'DepartementDetail',
  components: { CardComponent, HeroBar, TitleBar, FormationTable, salleTable },
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
      FormCount: 0
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Département',
        this.form.nom
      ]
    },
    heroTitle () {
      return 'Détails du département ' + this.form.nom
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'newDep' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nouveau département'
      } else {
        return 'Dashboard'
      }
    }
  },
  created () {
    this.getData()
    console.log(parseInt(this.id))
    axios.post('http://localhost:8090/api/stats/countWhere', {
      table: 'formations',
      fk: 'departementDepartementId',
      value: parseInt(this.id)
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data)
        this.FormCount = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
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
          .get('http://localhost:8090/api/data/departements', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.departementId === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
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
