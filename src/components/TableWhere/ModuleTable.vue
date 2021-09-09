<template #detail="props">
      <div>
        <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
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
                        <router-link :to="{name:'dep.edit', params: {id: props.row.clubId}}" class="button is-small is-primary">
                          <b-icon icon="account-edit" size="is-small"/>
                        </router-link>
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
// const data = [{ id: 1, nom: 'UEF1', type: 'Fondamentale', coefficient: '9', credit: '9', charge: '450', modules: { id: 2, nom: 'Analyse', type: 'Math', coefficient: '5', credit: '5', charge: '250' } }]
export default {
  name: 'ModuleTable',
  components: {
    ModalBox
  },
  props: {
    idUe: {
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      idS: this.id,
      modules: [],
      data: []
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
    }
  }
}

</script>
