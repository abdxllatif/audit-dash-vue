<template>
  <b-modal :active.sync="isSaveModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="chart-bar"></b-icon>
            Sauvergarde des résultats
        </p>
      </header>
      <section class="modal-card-body">
            <b-field label="Titre" horizontal>
                <b-input icon="account" v-model="form.title" placeholder="Titre pour les résultats" name="name" required />
            </b-field>
            <b-field label="Description" message="Ne pas dépasser 255 caractères" horizontal>
                <b-input type="textarea" placeholder="Une petite description" v-model="form.desc" maxlength="255" required/>
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
  name: 'ModalSaveResult',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    vars: {
      default: []
    }
  },
  data () {
    return {
      isSaveModalActive: false,
      types: [
        'pie',
        'bar',
        'area',
        'donut'
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
      axios.post('http://localhost:8082/api/data/save', {
        sql: 'select nikmo mani 3arf 3lah gtlk ndiroha cause ma3andich min njibha',
        result: this.$store.state.data,
        title: this.form.title,
        description: this.form.desc
      })
        .then(result => {
          console.log('z')
          console.log(result)
          this.$buefy.snackbar.open({
            message: 'la requete "' + this.form.title + '" sauvegardée',
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
      this.isSaveModalActive = newValue
    },
    isSaveModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
