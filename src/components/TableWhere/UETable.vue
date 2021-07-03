<template>
    <section>
        <b-table
            :data="data"
            ref="table"
            paginated
            per-page="5"
            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="nom"
            :detail-transition="transitionName"
            @details-open="(row) => $buefy.toast.open(`Expanded ${row.nom}`)"
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

            <template #detail="props">
                <b-table :data="data" :loading="isLoading">
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
                </b-table>
            </template>
        </b-table>

    </section>
</template>

<script>
import axios from 'axios'
// const data = [{ id: 1, nom: 'UEF1', type: 'Fondamentale', coefficient: '9', credit: '9', charge: '450', modules: { id: 2, nom: 'Analyse', type: 'Math', coefficient: '5', credit: '5', charge: '250' } }]
export default {
  name: 'UETable',
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
        /* await axios.post('http://localhost:8080/api/stats/data', {
          table: 'matieres',
          fk: 'ueUeId',
          value: r.data.ueId
        }, { headers: { 'x-access-token': this.$session.get('jwt') } })
          .then(r2 => {
              console.log(r2)
          }) */
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
    }
  }
}

</script>
