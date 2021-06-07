<template>
  <b-modal :active.sync="isNivModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Niveaux</p>
      </header>
      <section class="modal-card-body">
        <niveaux-table :data-url="`http://localhost:8080/api/data/niveaux`"/>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Sortir</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import NiveauxTable from '../Tables/NiveauxTable.vue'

export default {
  name: 'ModalBoxNiveaux',
  components: { NiveauxTable },
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
      isNivModalActive: false,
      niveaux: []
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    }
  },
  watch: {
    isActive (newValue) {
      this.isNivModalActive = newValue
    },
    isNivModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
