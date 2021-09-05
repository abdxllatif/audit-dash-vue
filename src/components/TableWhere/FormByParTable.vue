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
      default-sort="Formation"
      :data="formations">

      <b-table-column label="Formation" field="formation" sortable v-slot="props">
        <attribut-table :id="props.row.formationId" :dataUrl="'http://localhost:8080/api/data/formations/'" att="nom"></attribut-table>
      </b-table-column>
      <b-table-column label="Description" field="description" sortable v-slot="props">
        <attribut-table :id="props.row.formationId" :dataUrl="'http://localhost:8080/api/data/formations/'" att="description"></attribut-table>
      </b-table-column>
      <b-table-column label="Détails" field="details" v-slot="props">
        <router-link :to="{name:'FormationDetail', params: {id: props.row.formationId}}" class="button is-small is-dark">
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
  name: 'FormationTable',
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
      formations: [],
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
          console.log(r)
          console.log(parseInt(this.id))
          if (r.data && r.data.result) {
            if (r.data.result.length > this.perPage) {
              this.paginated = true
            }
            this.formations = r.data.result
            console.log(this.formations)
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
      axios.delete('http://localhost:8080/api/data/formations/' + this.trashObject.formationId, { headers: { 'x-access-token': this.$session.get('jwt') } })
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
