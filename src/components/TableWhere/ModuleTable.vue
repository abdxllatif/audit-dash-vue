<template #detail="props">
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
                </b-table>
</template>
<script>
import axios from 'axios'
// const data = [{ id: 1, nom: 'UEF1', type: 'Fondamentale', coefficient: '9', credit: '9', charge: '450', modules: { id: 2, nom: 'Analyse', type: 'Math', coefficient: '5', credit: '5', charge: '250' } }]
export default {
  name: 'ModuleTable',
  props: {
    idUe: {
    }
  },
  data () {
    return {
      idS: this.id,
      modules: [],
      data: []
    }
  },
  async mounted () {
    console.log('wsalt ' + this.idUe)
    this.isLoading = true
    await axios.post('http://localhost:8080/api/stats/data', {
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
  }
}

</script>
