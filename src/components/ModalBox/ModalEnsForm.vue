<template>
  <b-modal :active.sync="isEnsFormModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="chart-bar"></b-icon>
            Relier cet enseignant avec une formation
        </p>
      </header>
      <section class="modal-card-body">
            <b-field label="Ajout d'une formation">
                <b-select placeholder="Veuillez selectionner une formation" v-model="form.formationId" expanded>
                    <option
                        v-for="option in formations"
                        :value="option.formationId"
                        :key="option.formationId"
                        required>
                        {{ option.nom }}
                    </option>
                </b-select>
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
  name: 'ModalFormPar',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    ensId: {
      default: null
    }
  },
  data () {
    return {
      isEnsFormModalActive: false,
      formations: [],
      form: {
        formationId: ''
      }
    }
  },
  async mounted () {
    await axios.get('http://localhost:8080/api/data/formations', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.formations = this.listings.results
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
      axios.put('http://localhost:8080/api/data/enseignants', {
        formationId: this.form.formationId,
        enseignantId: this.ensId
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'la formation ' + this.form.nom + ' bien reliée',
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
      this.isEnsFormModalActive = newValue
    },
    isEnsFormModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
