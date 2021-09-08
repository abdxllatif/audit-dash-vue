<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
        <b-table
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="Titre"
      :data="partenaires">

      <b-table-column label="Titre" field="Titre" sortable v-slot="props">
        <attribut-table :id="props.row.enseignantId" :dataUrl="'http://localhost:8090/api/data/enseignants/'" att="nom"></attribut-table>
      </b-table-column>
      <b-table-column label="Type" field="type" sortable v-slot="props">
        <attribut-table :id="props.row.enseignantId" :dataUrl="'http://localhost:8090/api/data/enseignant/'" att="prenom"></attribut-table>
      </b-table-column>
      <b-table-column label="Détails" field="details" v-slot="props">
        <router-link :to="{name:'EnseignantDetail', params: {id: props.row.enseignantId}}" class="button is-small is-dark">
          Détails
        </router-link>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
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
  name: 'partenaireTable',
  components: { ModalBox, AttributTable },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      enseignants: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
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
    if (this.dataUrl) {
      this.isLoading = true
      await axios.get(this.dataUrl + this.id, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          console.log(r.data)
          if (r.data && r.data.result) {
            if (r.data.result.length > this.perPage) {
              this.paginated = true
            }
            this.enseignants = r.data.result
            console.log(this.enseignants)
          }
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          this.$buefy.snackbar.open({
            type: 'is-warning',
            message: 'Erreur GET partenaires de cette formation',
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
    niveauxModal (trashObject) {
      this.trashObject = trashObject

      this.isNivModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      axios.delete('http://localhost:8090/api/data/partenaires/' + this.trashObject.partenaireId, { headers: { 'x-access-token': this.$session.get('jwt') } })
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
                this.partenaires = r.data.results
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
