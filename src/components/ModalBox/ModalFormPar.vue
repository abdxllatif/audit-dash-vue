<template>
  <b-modal :active.sync="isFormParModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="chart-bar"></b-icon>
            Relier un partenaire avec cette formation
        </p>
      </header>
      <section class="modal-card-body">
            <b-field label="Ajout d'un partenaire">
                <b-select placeholder="Veuillez selectionner un partenaire" v-model="form.partenaireId" expanded>
                    <option
                        v-for="option in partenaires"
                        :value="option.partenaireId"
                        :key="option.partenaireId"
                        required>
                        {{ option.Nom }}
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
    formId: {
      default: null
    }
  },
  data () {
    return {
      isFormParModalActive: false,
      partenaires: [],
      form: {
        formationId: ''
      }
    }
  },
  async mounted () {
    await axios.get('http://localhost:8090/api/data/partenaires', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        this.listings = response.data
        this.partenaires = this.listings.results
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
      axios.put('http://localhost:8090/api/data/partenaire', {
        formationId: this.formId,
        partenaireId: this.form.partenaireId
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'le partenaire ' + this.form.Nom + ' bien relié',
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
      this.isFormParModalActive = newValue
    },
    isFormParModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
