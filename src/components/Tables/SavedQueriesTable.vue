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
      :data="queries">

      <b-table-column label="Titre" field="titre" sortable v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column label="Description" field="description" sortable v-slot="props">
        {{ props.row.description }}
      </b-table-column>
      <b-table-column label="Date de création" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.time">{{ props.row.time }}</small>
      </b-table-column>
      <b-table-column label="Détails" field="details" v-slot="props">
        <router-link :to="{name:'QueryResult', params: {json: props.row.result}}" class="button is-small is-dark">
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

export default {
  name: 'SavedQueriesTable',
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
      trashObject: null,
      queries: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.title
      }

      return null
    }
  },
  created () {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          console.log('result')
          console.log(r.data.doc)
          console.log('end result')
          this.isLoading = false
          if (r.data && r.data.doc) {
            if (r.data.doc.length > this.perPage) {
              this.paginated = true
            }
            this.queries = r.data.doc
            this.$store.state.queries = r.data.doc
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
    trashConfirm () {
      this.isModalActive = false
      axios.delete('http://localhost:8082/api/data/save/' + this.trashObject.title, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          console.log(r)
          axios
            .get(this.dataUrl, { headers: { 'x-access-token': this.$session.get('jwt') } })
            .then(r => {
              console.log('nikmok tnaket')
              console.log(r)
              this.isLoading = false
              if (r.data && r.data.doc) {
                if (r.data.doc.length > this.perPage) {
                  this.paginated = true
                }
                this.queries = r.data.doc
              }
            })
            .catch(e => {
              this.isLoading = false
              this.$buefy.toast.open({
                message: `Error: ${e.message}`,
                type: 'is-danger'
              })
            })
          this.isLoading = false
          this.$buefy.toast.open({
            message: 'Confirmed',
            type: 'is-success'
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
    reload () {
      this.isLoading = true
      axios
        .get(this.dataUrl, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          console.log('result')
          console.log(r.data.doc)
          console.log('end result')
          this.isLoading = false
          if (r.data && r.data.doc) {
            if (r.data.doc.length > this.perPage) {
              this.paginated = true
            }
            this.queries = r.data.doc
            this.$store.state.queries = r.data.doc
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
  }
}
</script>
