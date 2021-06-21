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
        <card-component v-if="isProfileExists" title="Profil du partenaire" icon="account" class="tile is-child">
          <b-field label="ID" horizontal>
              <b-input v-model="form.partenaireId" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Nom" horizontal>
            <b-input :value="form.Nom" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Type" horizontal>
            <b-input :value="form.type" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Created" horizontal>
            <b-input :value="form.createdAt" custom-class="is-static" readonly/>
          </b-field>
        </card-component>
        <card-component v-if="isProfileExists" title="Formations" icon="account" class="tile is-child">
            <form-table :data-url="`http://localhost:8080/api/data/formations`" :checkable="true"/>
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
import FormTable from '@/components/Tables/FormTable.vue'

export default {
  name: 'PartenaireDetail',
  components: { CardComponent, Tiles, HeroBar, TitleBar, FormTable },
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
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.nom
      } else {
        lastCrumb = 'New client'
      }

      return [
        'Admin',
        'Partenaire',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return 'Détails du partenaire ' + this.form.nom
      } else {
        return 'Create Client'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'newPar' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nouveau partenaire'
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
          .get('http://localhost:8080/api/data/partenaires', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.partenaireId === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
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
