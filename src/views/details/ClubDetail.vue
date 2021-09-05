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
        <b-tab-item label="Profil du club" icon="information-outline">
          <b-field label="ID" horizontal>
              <b-input v-model="form.clubId" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Nom" horizontal>
            <b-input :value="form.nom" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Type" horizontal>
            <b-input :value="form.type" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Created" horizontal>
            <b-input :value="form.createdAt" custom-class="is-static" readonly/>
          </b-field>
        </b-tab-item>
        <b-tab-item label="Activités du club" icon="account-supervisor">
          <card-component v-if="isProfileExists" title="Activités" icon="account" class="tile is-child">
              <activite-table :data-url="`http://localhost:8090/api/stats/data`" :id="form.clubId" :checkable="false"/>
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
// import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import ActiviteTable from '@/components/TableWhere/ActiviteTable.vue'

export default {
  name: 'ClubDetail',
  components: { CardComponent, HeroBar, TitleBar, ActiviteTable },
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
      isProfileExists: false
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Club',
        this.form.nom
      ]
    },
    heroTitle () {
      return 'Détails du club ' + this.form.nom
    },
    heroRouterLinkTo () {
      return { name: 'newClub' }
    },
    heroRouterLinkLabel () {
      return 'Nouveau club'
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
          .get('http://localhost:8090/api/data/clubs', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.clubId === parseInt(this.id))

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
