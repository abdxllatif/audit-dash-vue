<template>
  <div>
    <modal-delib-etd :is-active="isDelibEtdModalActive" :Etdid="Etudiantid" :Matid="matiereId" @confirm="DelibEtdConfirm"
               @cancel="DelibEtdCancel"/>
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
      <!--<b-table-column :visible="!this.edit" label="Déliberation" field="deliberation" sortable v-slot="props">
        {{ props.row.Moyenne }}
      </b-table-column>
      <b-table-column :visible="this.edit" label="Déliberation" field="deliberation" sortable>
        <b-field>
            <b-input placeholder="Moyenne"
                value=""
                min="0"
                max="20">
            </b-input>
        </b-field>-->
      <b-table-column label="Déliberation" field="deliberation" sortable v-slot="props">
        <moyenne-delib :Etdid="props.row.etudiantId" :Matid="matiereId"></moyenne-delib>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <button class="button is-small is-primary" type="button" @click.prevent="DelibEtdModal(props.row)">
            Modifier
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
import AttributTable from '@/components/Tables/Adds/AttributTable'
import ModalDelibEtd from '@/components/ModalBox/ModalDelibEtd'
import MoyenneDelib from '@/components/Tables/Adds/MoyenneDelib'

export default {
  name: 'EtudDelibTable',
  components: { AttributTable, ModalDelibEtd, MoyenneDelib },
  props: {
    matiereId: {
      type: String,
      default: null
    },
    listetudiants: {
      default: []
    }
  },
  data () {
    return {
      edit: false,
      isModalActive: false,
      etudiants: [],
      isLoading: false,
      paginated: true,
      perPage: 20,
      checkedRows: [],
      isDelibEtdModalActive: false,
      etd: null
    }
  },
  computed: {
    Etudiantid () {
      if (this.etd) {
        console.log('from computed ' + this.etd.etudiantId)
        return this.etd.etudiantId
      }
      return null
    }
  },
  mounted () {
    this.etudiants = this.listetudiants
    if (this.dataUrl) {
      this.isLoading = true
      axios.post(this.dataUrl, {
        table: 'formations',
        fk: 'departementDepartementId',
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
            this.formations = r.data
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
    DelibEtdModal (a) {
      this.etd = a
      this.isDelibEtdModalActive = true
    },
    DelibEtdConfirm () {
      this.isDelibEtdModalActive = false
    },
    DelibEtdCancel () {
      this.isDelibEtdModalActive = false
    }
  }
}
</script>
