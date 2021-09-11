<template>
  <div>
    <b-table
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort=""
      :data="history">

      <b-table-column label="Action" field="action" sortable v-slot="props">
        {{ props.row.action }}
      </b-table-column>
      <b-table-column label="Table" field="table" sortable v-slot="props">
        {{ props.row.table }}
      </b-table-column>
      <b-table-column label="ID" field="id" sortable v-slot="props">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column label="L'acteur" field="acteur" sortable v-slot="props">
        {{ props.row.acteur }}
      </b-table-column>
      <b-table-column label="Temps d'action" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.time }}</small>
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
// import axios from 'axios'

export default {
  name: 'HistoryTable',
  components: {},
  props: {
    dataUrl: {
      default: null
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      history: this.$store.state.logsdata,
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
  },
  /* mounted () {
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
            this.history = r.data.results
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
  }, */
  methods: {
  }
}
</script>
