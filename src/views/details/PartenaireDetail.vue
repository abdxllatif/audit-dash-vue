<template>
  <div>
    <modal-par-form :is-active="isParFormModalActive" :parId="this.id" @confirm="ParFormConfirm"
               @cancel="ParFormCancel"/>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <b-tabs>
        <b-tab-item label="Profil du partenaire" icon="information">
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
        </b-tab-item>
        <b-tab-item label="Formations" icon="account">
          <card-component title="Table des formations reliées" icon="account" vers-title="Nouveau" todo="ModalNewFormation" @doit="ParFormModal">
            <form-table :data-url="`http://localhost:8090/api/data/partenaire/formations/`" :id="this.id"/>
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
import FormTable from '@/components/TableWhere/FormByParTable'
import ModalParForm from '@/components/ModalBox/ModalParForm.vue'

export default {
  name: 'PartenaireDetail',
  components: { CardComponent, HeroBar, TitleBar, FormTable, ModalParForm },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isParFormModalActive: false,
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
        'Partenaire',
        this.form.Nom
      ]
    },
    heroTitle () {
      return 'Détails du partenaire ' + this.form.Nom
    },
    heroRouterLinkTo () {
      return { name: 'newPar' }
    },
    heroRouterLinkLabel () {
      return 'Nouveau partenaire'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    ParFormModal () {
      this.isParFormModalActive = true
    },
    ParFormConfirm () {
      this.isParFormModalActive = false
      // this.$refs.outilTable.mounted
    },
    ParFormCancel () {
      this.isParFormModalActive = false
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
          .get('http://localhost:8090/api/data/partenaires', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.partenaireId === parseInt(this.id))

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
