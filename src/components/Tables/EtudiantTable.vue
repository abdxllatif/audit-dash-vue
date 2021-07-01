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
      default-sort="nom"
      :data="etudiants">

      <b-table-column label="Nom" field="nom" sortable v-slot="props">
        {{ props.row.Nom }}
      </b-table-column>
      <b-table-column label="Prénom" field="prenom" sortable v-slot="props">
        {{ props.row.prenom }}
      </b-table-column>
      <b-table-column label="Date de naissance" field="date" sortable v-slot="props">
        {{ props.row.data_naissance }}
      </b-table-column>
      <b-table-column label="Lieu de naissance" field="lieu" sortable v-slot="props">
        {{ props.row.lieu_naissance }}
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'dep.edit', params: {id: props.row.departementId}}" class="button is-small is-primary">
            <b-icon icon="account-edit" size="is-small"/>
          </router-link>
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

export default {
  name: 'EtudiantTable',
  components: { ModalBox },
  props: {
    dataUrl: {
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
      isFormationModalActive: false,
      trashObject: null,
      etudiants: [],
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
  mounted () {
    /* if (this.dataUrl) {
      if (r.data && r.data.data) {
        if (r.data.data.length > this.perPage) {
          this.paginated = true
        }
        this.etudiants = this.$session.get('deps')
      }
    } */
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.results) {
            if (r.data.results.length > this.perPage) {
              this.paginated = true
            }
            this.etudiants = r.data.results
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    FormationModal (trashObject) {
      this.trashObject = trashObject
      this.isFormationModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      axios.delete('http://localhost:8080/api/data/etudiants/' + this.trashObject.etudiantId, { headers: { 'x-access-token': this.$session.get('jwt') } })
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
              if (r.data && r.data.data) {
                if (r.data.data.length > this.perPage) {
                  this.paginated = true
                }
                this.etudiants = r.data.data
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
    FormationConfirm () {
      this.isModalActive = false
    },
    trashCancel () {
      this.isModalActive = false
    },
    FormationCancel () {
      this.isFormationModalActive = false
    }
  }
}
</script>
