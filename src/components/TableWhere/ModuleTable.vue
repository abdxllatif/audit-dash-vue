<template #detail="props">
      <div>
        <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
        <edit-matiere-modal :is-active="isEditMatiereModalActive" :Mat="this.MatId" @confirm="EditMatiereConfirm"
               @cancel="EditMatiereCancel"/>
                <b-table :data="data">
                    <b-table-column field="nom" label="Nom" sortable v-slot="props">
                        {{ props.row.nom }}
                    </b-table-column>
                    <b-table-column field="id" label="Type" sortable v-slot="props">
                        {{ props.row.type }}
                    </b-table-column>
                    <b-table-column field="id" label="Charge horaire" sortable v-slot="props">
                        {{ props.row.ChargeHoraire }}
                    </b-table-column>
                    <b-table-column field="id" label="Crédit" sortable v-slot="props">
                        {{ props.row.credit }}
                    </b-table-column>
                    <b-table-column field="delib" label="Déliberation" sortable v-slot="props">
                        <router-link :to="{name:'DelibDetail', params: {id: props.row.matiereId}}" class="button is-small is-dark">
                          Déliberation
                        </router-link>
                    </b-table-column>
                    <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
                      <div class="buttons is-right">
                        <button class="button is-small is-info" type="button" @click.prevent="EditMatiereModal(props.row)">
                          <b-icon icon="account-edit" size="is-small"/>
                        </button>
                        <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
                          <b-icon icon="trash-can" size="is-small"/>
                        </button>
                      </div>
                    </b-table-column>
                </b-table>
      </div>
</template>
<script>
import ModalBox from '@/components/ModalBox'
import axios from 'axios'
import EditMatiereModal from '../ModalBox/ModalEditMatiere.vue'

export default {
  name: 'ModuleTable',
  components: {
    ModalBox, EditMatiereModal
  },
  props: {
    idUe: {
    }
  },
  data () {
    return {
      isModalActive: false,
      isEditMatiereModalActive: false,
      trashObject: null,
      idS: this.id,
      modules: [],
      data: [],
      Mat: null
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.nom
      }

      return null
    },
    MatId () {
      if (this.Mat) {
        console.log('from computed ' + this.Mat.matiereId)
        return this.Mat.matiereId
      }
      return null
    }
  },
  async mounted () {
    console.log('wsalt ' + this.idUe)
    this.isLoading = true
    await axios.post('http://localhost:8090/api/stats/data', {
      table: 'matieres',
      fk: 'ueUeId',
      value: this.idUe
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(r => {
        this.isLoading = false
        if (r && r.data) {
          if (r.data.length > this.perPage) {
            this.paginated = true
          }
          this.data = r.data
        }
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur f module table',
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
      axios.delete('http://localhost:8090/api/data/matieres/' + this.trashObject.matiereId, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: 'matiere supprimée',
            type: 'is-success'
          })
          axios.post('http://localhost:8090/api/stats/data', {
            table: 'matieres',
            fk: 'ueUeId',
            value: this.idUe
          }, { headers: { 'x-access-token': this.$session.get('jwt') } })
            .then(r => {
              this.isLoading = false
              if (r && r.data) {
                if (r.data.length > this.perPage) {
                  this.paginated = true
                }
                this.data = r.data
              }
            })
            .catch(e => {
              this.errorMessage = e.message
              console.log('There was an error!', e)
              this.$buefy.snackbar.open({
                type: 'is-warning',
                message: 'Erreur f module table',
                queue: false
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
    },
    EditMatiereModal (Mat) {
      this.Mat = Mat
      console.log('here' + this.Mat.matiereId)
      this.isEditMatiereModalActive = true
    },
    EditMatiereConfirm () {
      this.isEditMatiereModalActive = false
      axios.post('http://localhost:8090/api/stats/data', {
        table: 'matieres',
        fk: 'ueUeId',
        value: this.idUe
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          if (r && r.data) {
            if (r.data.length > this.perPage) {
              this.paginated = true
            }
            this.data = r.data
          }
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          this.$buefy.snackbar.open({
            type: 'is-warning',
            message: 'Erreur f module table',
            queue: false
          })
        })
    },
    EditMatiereCancel () {
      this.isEditMatiereModalActive = false
    }
  }
}

</script>
