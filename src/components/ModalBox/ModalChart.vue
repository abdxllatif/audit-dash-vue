<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="chart-bar"></b-icon>
            Création d'un graphe
        </p>
      </header>
      <section class="modal-card-body">
            <b-field label="X: " horizontal>
                  <b-select placeholder="Selectionne un type de graphe" v-model="form.x" expanded required>
                    <option v-for="(type, index) in types" :key="index" :value="type">
                      {{ type }}
                    </option>
                  </b-select>
            </b-field>
            <b-field label="Y: " horizontal>
                  <b-select placeholder="Selectionne un type de graphe" v-model="form.y" expanded required>
                    <option v-for="(type, index) in types" :key="index" :value="type">
                      {{ type }}
                    </option>
                  </b-select>
            </b-field>
            <b-field label="Type" horizontal>
                  <b-select placeholder="Selectionne un type de graphe" v-model="form.type" icon="chart-bar" expanded required>
                    <option v-for="(types, index) in types" :key="index" :value="types">
                      {{ types }}
                    </option>
                  </b-select>
            </b-field>
        <p>Action can not be undone.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Annuler</button>
        <button class="button is-danger" @click="confirm">Confirmer</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalChart',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      types: [
        'PieChart',
        'BarChart',
        'AreaChart'
      ],
      form: {
        x: '',
        y: '',
        type: ''
      }
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
      this.isModalActive = newValue
    },
    isModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
