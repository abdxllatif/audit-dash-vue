<template>
  <b-modal :active.sync="isSalleOutilsModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="chart-bar"></b-icon>
            Ajouter un outil à la salle
        </p>
      </header>
      <section class="modal-card-body">
            <b-field label="Ajout d'un équipement">
                <b-select placeholder="Veuillez selectionner un outil" v-model="form.outilId" expanded>
                    <option
                        v-for="option in outils"
                        :value="option.outilId"
                        :key="option.outilId"
                        required>
                        {{ option.titre }}
                    </option>
                </b-select>
            </b-field>
            <b-field>
                <b-numberinput v-model="form.quantity" required></b-numberinput>
            </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Annuler</button>
        <button class="button is-success" @click="confirm">Confirmer</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModalSalleOutils',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    salleId: {
      default: null
    }
  },
  data () {
    return {
      isSalleOutilsModalActive: false,
      outils: [],
      form: {
        outilId: '',
        quantity: 0
      }
    }
  },
  async mounted () {
    await axios.get('http://localhost:8090/api/data/outils', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.outils = this.listings.results
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      axios.put('http://localhost:8090/api/data/outils/salles', {
        outilId: this.form.outilId,
        salleId: this.salleId,
        quantity: this.form.quantity
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: "l'outil " + this.form.titre + ' bien ajoutée',
            queue: false
          })
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          this.$buefy.snackbar.open({
            type: 'is-warning',
            message: "Erreur d'insertion",
            queue: false
          })
        })
      this.$emit('confirm')
    }
  },
  watch: {
    isActive (newValue) {
      this.isSalleOutilsModalActive = newValue
    },
    isSalleOutilsModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
