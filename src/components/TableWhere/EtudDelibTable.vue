<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
        <div class="control is-flex">
            <b-switch v-model="this.edit" @input="changeMode">Mode edition</b-switch>
            <b-button class="is-success is-small right">Save</b-button>
        </div>
        <b-table
      :loading="isLoading"
      :paginated="true"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="nom"
      :data="listetudiants">

      <b-table-column label="Nom" field="nom" sortable v-slot="props">
        <attribut-table :id="props.row.etudiantId" :dataUrl="'http://localhost:8080/api/data/etudiants/'" :att="'nom'" ></attribut-table>
      </b-table-column>
      <b-table-column label="Prénom" field="prenom" sortable v-slot="props">
          <attribut-table :id="props.row.etudiantId" :dataUrl="'http://localhost:8080/api/data/etudiants/'" :att="'prenom'" ></attribut-table>
      </b-table-column>
      <b-table-column label="Détails" field="details" v-slot="props">
        <router-link :to="{name:'EtudiantDetail', params: {id: props.row.etudiantId}}" class="button is-small is-dark">
          Détails
        </router-link>
      </b-table-column>
      <b-table-column :visible="!this.edit" label="Déliberation" field="deliberation" sortable v-slot="props">
        {{ props.row.Moyenne }}
      </b-table-column>
      <b-table-column :visible="this.edit" label="Déliberation" field="deliberation" sortable>
        <b-field>
            <b-input placeholder="Moyenne"
                value=""
                min="0"
                max="20">
            </b-input>
        </b-field>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <button class="button is-small is-primary" type="button" @click.prevent="trashModal(props.row)">
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
  name: 'FormationTable',
  components: { ModalBox, AttributTable },
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
    changeMode () {
      this.edit = !this.edit
    },
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
