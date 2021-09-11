<template>
  <b-modal :active.sync="isDelibEtdModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="note"></b-icon>
            Déliberation de l'étudiant
        </p>
      </header>
      <section class="modal-card-body">
            <b-field label="Ajout d'une moyenne">
                <b-input placeholder="Moyenne"
                    v-model="form.moy"
                    value=0
                    min="0"
                    max="20">
                </b-input>
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
  name: 'ModalDelibEtd',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    Matid: {
      default: null
    },
    Etdid: {
      default: null
    }
  },
  data () {
    return {
      isDelibEtdModalActive: false,
      partenaires: [],
      form: {
        moy: 0
      }
    }
  },
  methods: {
    cancel () {
      console.log('etudiantId: ' + this.Etdid)
      console.log('matiere: ' + this.Matid)
      this.$emit('cancel')
    },
    async confirm () {
      var a
      await axios.get('http://localhost:8090/api/data/DelibModules/' + this.Etdid + '/' + this.Matid, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          console.log(r.data.results[0].DelibModuleId)
          a = r.data.results[0].DelibModuleId
        })
        .catch(e => {
          this.isLoading = false
          console.log('id delib non trouvé')
        })
      axios.post('http://localhost:8090/api/data/DelibModules/' + a, {
        Moyenne: this.form.moy,
        admin: this.$store.state.userEmail
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: 'Déliberation modifiée',
            queue: false
          })
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          this.$buefy.snackbar.open({
            type: 'is-warning',
            message: 'Erreur de modification',
            queue: false
          })
        })
      this.$emit('confirm')
    }
  },
  watch: {
    isActive (newValue) {
      this.isDelibEtdModalActive = newValue
    },
    isDelibEtdModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
