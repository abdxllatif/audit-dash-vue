<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
        <b-table
      :loading="isLoading"
      :paginated="true"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="nom"
      :data="etudiants">

      <b-table-column label="Nom" field="nom" sortable v-slot="props">
        <attribut-table :id="props.row.etudiantId" :dataUrl="'http://localhost:8090/api/data/etudiants/'" :att="'nom'" ></attribut-table>
      </b-table-column>
      <b-table-column label="Prénom" field="prenom" sortable v-slot="props">
          <attribut-table :id="props.row.etudiantId" :dataUrl="'http://localhost:8090/api/data/etudiants/'" :att="'prenom'" ></attribut-table>
      </b-table-column>
      <b-table-column label="Détails" field="details" v-slot="props">
        <router-link :to="{name:'EtudiantDetail', params: {id: props.row.etudiantId}}" class="button is-small is-dark">
          Détails
        </router-link>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <button class="button is-small is-primary" type="button" @click.prevent="DelibEtdModal(props.row)">
            Modifier
          </button>
          <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
            <b-icon icon="trash-can" size="is-small"/>
          </button>
        </div>
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
import AttributTable from '@/components/Tables/Adds/AttributTable'

export default {
  name: 'EtudNivTable',
  components: { ModalBox, AttributTable },
  props: {
    id: {
      default: []
    }
  },
  data () {
    return {
      edit: false,
      isModalActive: false,
      trashObject: null,
      etudiants: [],
      isLoading: false,
      paginated: true,
      perPage: 20,
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
  mounted () {
    this.isLoading = true
    axios.post('http://localhost:8090/api/stats/data', {
      table: 'etudiant_niveauxes',
      fk: 'niveauId',
      value: parseInt(this.id)
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(r => {
        this.isLoading = false
        console.log(r.data)
        console.log(parseInt(this.id))
        if (r && r.data) {
          if (r.data.length > this.perPage) {
            this.paginated = true
          }
          this.etudiants = r.data
        }
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
    trashModal (trashObject) {
      this.trashObject = trashObject

      this.isModalActive = true
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
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
