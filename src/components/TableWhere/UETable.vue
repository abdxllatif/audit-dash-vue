<template>
    <section>
      <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
        <b-table
            :data="data"
            ref="table"
            paginated
            per-page="5"
            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="nom"
            :detail-transition="transitionName"
            :show-detail-icon="showDetailIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <b-table-column field="user.first_name" label="Nom" sortable v-slot="props">
                <template v-if="showDetailIcon">
                    {{ props.row.nom}}
                </template>
                <template v-else>
                    <a @click="props.toggleDetails(props.row)">
                        {{ props.row.nom }}
                    </a>
                </template>
            </b-table-column>

            <b-table-column field="user.last_name" label="Type" sortable v-slot="props">
                {{ props.row.type }}
            </b-table-column>

            <b-table-column field="UE.coefficient" label="Coefficient" sortable v-slot="props">
                {{ props.row.Coefficient }}
            </b-table-column>

            <b-table-column field="UE.credit" label="Crédit" sortable v-slot="props">
                {{ props.row.credit }}
            </b-table-column>

            <b-table-column field="UE.charge" label="Charge horaire" sortable v-slot="props">
                {{ props.row.ChargeHoraire }}
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

            <template #detail="props">
              <module-table v-bind:idUe="props.row.ueId"></module-table>
                <!--<b-table :data="data" :loading="isLoading">
                    <b-table-column field="nom" label="Nom" sortable>
                        {{ props.row.nom }}
                    </b-table-column>
                    <b-table-column field="id" label="Type" sortable>
                        {{ props.row.type }}
                    </b-table-column>
                    <b-table-column field="id" label="Charge horaire" sortable>
                        {{ props.row.ChargeHoraire }}
                    </b-table-column>
                    <b-table-column field="id" label="Crédit" sortable>
                        {{ props.row.credit }}
                    </b-table-column>
                </b-table>-->
            </template>
        </b-table>

    </section>
</template>

<script>
import axios from 'axios'
import ModuleTable from './ModuleTable.vue'
import ModalBox from '../ModalBox.vue'

// const data = [{ id: 1, nom: 'UEF1', type: 'Fondamentale', coefficient: '9', credit: '9', charge: '450', modules: { id: 2, nom: 'Analyse', type: 'Math', coefficient: '5', credit: '5', charge: '250' } }]
export default {
  name: 'UETable',
  components: { ModuleTable, ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    id: {
    }
  },
  data () {
    return {
      idS: this.id,
      isModalActive: false,
      trashObject: null,
      ues: [],
      data: [],
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: false
    }
  },
  async mounted () {
    this.isLoading = true
    await axios.post('http://localhost:8080/api/stats/data', {
      table: 'ues',
      fk: 'semestreSemestreId',
      value: this.id
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
          message: 'Erreur fl count',
          queue: false
        })
      })
  },
  computed: {
    transitionName () {
      let a = ''
      if (this.useTransition) {
        a = 'fade'
      }
      return a
    },
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.nom
      }

      return null
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      axios.delete('http://localhost:8080/api/data/ues/' + this.trashObject.ueId, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: 'Confirmed',
            type: 'is-success'
          })
          axios.post('http://localhost:8080/api/stats/data', {
            table: 'ues',
            fk: 'semestreSemestreId',
            value: this.id
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
                message: 'Erreur fl count',
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
