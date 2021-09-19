<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="nom"
      :data="activites">

      <b-table-column label="Titre" field="titre" sortable v-slot="props">
        {{ props.row.titre }}
      </b-table-column>
      <b-table-column label="Type" field="type" sortable v-slot="props">
        {{ props.row.type }}
      </b-table-column>
      <b-table-column label="Date début" field="date debut" sortable v-slot="props">
        {{ getdate(props.row.date_debut) }}
      </b-table-column>
      <b-table-column label="Date fin" field="date fin" sortable v-slot="props">
        {{ getdate(props.row.date_fin) }}
      </b-table-column>
      <b-table-column label="Salle principale" field="salle" sortable v-slot="props">
        <name :id="props.row.salleSalleId" :dataUrl="'http://localhost:8090/api/data/salles/'"/>
      </b-table-column>
      <b-table-column label="Responsable" field="responsable" sortable v-slot="props">
        <name :id="props.row.clubClubId" :dataUrl="'http://localhost:8090/api/data/clubs/'"/>
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'activiteEdit', params: {id: props.row.activiteId}}" class="button is-small is-primary">
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
import Name from '@/components/Tables/Adds/Name'
// import { moment } from 'moment'
import dayjs from 'dayjs'
// import Vue from 'vue'
// const moment = require('moment')

export default {
  name: 'ActiviteTable',
  components: { ModalBox, Name },
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
      activites: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      nom: ''
    }
  },
  computed: {
    // getDate (date) {
    // const dateString = date.toString()
    // const momentObj = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSZ')
    // return momentObj.format('YYYY-MM-DD')
    // return moment(date).format('DD-MM-YYYY')
    // return moment(date, 'DD-MM-YYYY').isValid()
    // return moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY')
    // },
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.nom
      }

      return null
    }
  },
  mounted () {
    console.log(this.props)
    console.log(this.$session.get('deps'))
    /* if (this.dataUrl) {
      if (r.data && r.data.data) {
        if (r.data.data.length > this.perPage) {
          this.paginated = true
        }
        this.departements = this.$session.get('deps')
      }
    } */
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
            this.activites = r.data.results
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
    getdate: function (t) {
      return dayjs(t).format('DD-MM-YYYY')
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    getClub (a) {
      let club
      axios.get('http://localhost:8090/api/data/clubs/' + a, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          console.log(r.data.data.nom)
          club = r.data.data.nom
        })
        .catch(e => {
          this.isLoading = false
          console.log(e)
        })
      return club
    },
    trashConfirm () {
      this.isModalActive = false
      axios.delete('http://localhost:8090/api/data/activites/' + this.trashObject.activiteId + '/' + this.$store.state.userEmail, { headers: { 'x-access-token': this.$session.get('jwt') } })
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
                this.departements = r.data.results
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
