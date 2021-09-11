<template>
  <b-modal :active.sync="isDelibModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="chart-bar"></b-icon>
            Déliberation
        </p>
      </header>
      <section class="modal-card-body">
            <b-field>
                <b-numberinput v-model="form.moy" required></b-numberinput>
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
  name: 'ModalDelib',
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
      isDelibModalActive: false,
      outils: [],
      form: {
        outilId: '',
        quantity: 0
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      axios.put('http://localhost:8090/api/data/DelibModules/' + this.id, {
        // annee: this.annee,
        Moyenne: this.form.moy,
        // Coefficient: this.Co,
        // Credit: this.Cr,
        // etudiantId: this.Etd,
        // matiereId: this.Mat,
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
      this.isDelibModalActive = newValue
    },
    isDelibModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
