<template>
  <b-modal :active.sync="isFormationModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Formations</p>
      </header>
      <section class="modal-card-body">
        <b-table>
          <b-table-column label="Titre" field="titre" sortable>
          </b-table-column>
          <b-table-column label="Description" field="description" sortable>
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
        </b-table>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button class="button is-danger" @click="confirm">Delete</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalBoxForm',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    trashObjectName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isFormationModalActive: false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  },
  watch: {
    isActive (newValue) {
      this.isFormationModalActive = newValue
    },
    isFormationModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
