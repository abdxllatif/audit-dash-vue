<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <modal-delib-etd :is-active="isDelibEtdModalActive" @confirm="DelibEtdConfirm"
               @cancel="DelibEtdCancel"/>
        <b-table
      :loading="isLoading"
      :paginated="true"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="nom"
      :data="delibs">

      <b-table-column label="Module" field="module" sortable v-slot="props">
        <name :id="props.row.matiereMatiereId" :dataUrl="'http://localhost:8090/api/data/matieres/'" ></name>
      </b-table-column>
      <b-table-column label="Coefficient" field="coefficient" sortable v-slot="props">
          {{ props.row.Coefficient }}
          <!--<attribut-table :id="props.row.etudiantId" :dataUrl="'http://localhost:8090/api/data/etudiants/'" :att="'prenom'" ></attribut-table>-->
      </b-table-column>
      <b-table-column label="Détails" field="details" v-slot="props">
        <router-link :to="{name:'DelibDetail', params: {id: props.row.matiereMatiereId}}" class="button is-small is-dark">
          Détails
        </router-link>
      </b-table-column>
      <b-table-column label="Déliberation" field="deliberation" sortable v-slot="props">
        {{ props.row.Moyenne }}
        <!--<moyenne-delib :Etdid="props.row.etudiantId" :Matid="matiereId"></moyenne-delib>-->
      </b-table-column>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import ModalBox from '@/components/ModalBox'
// import AttributTable from '@/components/Tables/Adds/AttributTable'
import Name from '@/components/Tables/Adds/Name'
import ModalDelibEtd from '@/components/ModalBox/ModalDelibEtd'
// import MoyenneDelib from '@/components/Tables/Adds/MoyenneDelib'

export default {
  name: 'DelibOfEtdTable',
  components: { ModalBox, Name, ModalDelibEtd },
  props: {
    etdid: null
  },
  data () {
    return {
      edit: false,
      isModalActive: false,
      trashObject: null,
      delibs: [],
      isLoading: false,
      paginated: true,
      perPage: 10,
      checkedRows: [],
      isDelibEtdModalActive: false
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.nom
      }

      return null
    }
  },
  async mounted () {
    // const etd = this.etdid
    const a = 0
    if (a === 0) {
      this.isLoading = true
      await axios.get('http://localhost:8090/api/data/DelibModuless/' + 2, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          console.log(r.data)
          if (r && r.data) {
            if (r.data.length > this.perPage) {
              this.paginated = true
            }
            this.delibs = r.data.results
          }
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          this.$buefy.snackbar.open({
            type: 'is-warning',
            message: e,
            queue: false
          })
        })
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject

      this.isModalActive = true
    },
    DelibEtdModal (trashObject) {
      this.isDelibEtdModalActive = true
    },
    DelibEtdConfirm () {
      this.isDelibEtdModalActive = false
    },
    DelibEtdCancel () {
      this.isDelibEtdModalActive = false
    },
    niveauxModal (trashObject) {
      this.trashObject = trashObject

      this.isNivModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      axios.delete('http://localhost:8090/api/data/formations/' + this.trashObject.formationId, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: 'Confirmed',
            type: 'is-success'
          })
          axios
            .get(this.dataUrl, { headers: { 'x-access-token': this.$session.get('jwt') } })
            .then(r => {
              this.isLoading = false
              if (r.data && r.data.results) {
                if (r.data.results.length > this.perPage) {
                  this.paginated = true
                }
                this.formations = r.data.results
              }
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
          console.log(e)
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    niveauxConfirm () {
      this.isNivModalActive = false
    },
    trashCancel () {
      this.isModalActive = false
    },
    niveauxCancel () {
      this.isNivModalActive = false
    }
  }
}
</script>
