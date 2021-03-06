<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="'/etudiant/new'" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <b-tabs>
            <b-tab-item label="Profil de l'étudiant" icon="account-details">
                <b-field label="ID" horizontal>
                  <b-input v-model="form.etudiantId" custom-class="is-static" readonly />
                </b-field>
                <b-field label="Nom" horizontal>
                  <b-input :value="form.nom" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Prénom" horizontal>
                  <b-input :value="form.prenom" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Date et lieu de naissance" horizontal>
                  <b-input :value="getdate(form.data_naissance) + ' - ' + form.lieu_naissance" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Adresse" horizontal>
                  <b-input :value="form.adresse" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Sex" horizontal>
                  <b-input :value="form.Sex" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Résidant?" horizontal>
                  <b-input v-if="form.intern=='no'" :value="'Non'" custom-class="is-static" readonly/>
                  <b-input v-if="form.intern=='oui'" :value="'Oui'" custom-class="is-static" readonly/>
                </b-field>
                <!--<b-field label="Niveau" horizontal>
                  <b-input :value="dep" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Formation" horizontal>
                  <b-input :value="dep" custom-class="is-static" readonly/>
                </b-field>
                <b-field label="Département" horizontal>
                  <b-input :value="dep" custom-class="is-static" readonly/>
                </b-field>-->
            </b-tab-item>
            <b-tab-item label="Notes">
              <delib-of-etd-table :etdid='form.etudiantId'></delib-of-etd-table>
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
import DelibOfEtdTable from '@/components/TableWhere/DelibOfEtdTable'
// import CardComponent from '@/components/CardComponent'

export default {
  name: 'EtudiantDetail',
  components: { HeroBar, TitleBar, DelibOfEtdTable },
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
        this.form.nom
      ]
    },
    heroTitle () {
      return "Détails de l'étudiant " + this.form.nom
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Nouveau étudiant'
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
          .get('http://localhost:8090/api/data/etudiants', { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r => {
            const item = find(r.data.results, item => item.etudiantId === parseInt(this.id))

            if (item) {
              console.log(item)
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
