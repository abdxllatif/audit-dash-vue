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
      default-sort="titre"
      :data="outils">

      <b-table-column label="Titre" field="nom" sortable v-slot="props">
        {{ props.row.titre }}
      </b-table-column>
      <b-table-column label="Type" field="type" sortable v-slot="props">
        {{ props.row.type }}
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'client.edit', params: {id: props.row.id}}" class="button is-small is-primary">
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
  name: 'outilTable',
  components: { ModalBox },
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
      outils: [],
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
        table: 'outils',
        fk: 'salleSalleId',
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
            this.outils = r.data
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
    trashConfirm () {
      this.isModalActive = false
      axios.delete('http://localhost:8080/api/data/outils/' + this.trashObject.outilId, { headers: { 'x-access-token': this.$session.get('jwt') } })
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
                this.outils = r.data.results
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
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
