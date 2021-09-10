<template>
  <b-modal :active.sync="isNewUEModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="note"></b-icon>
            Ajouter une nouvelle UE
        </p>
      </header>
      <section class="modal-card-body">
            <b-field label="Nom">
                <b-input icon="account" v-model="form.nom" placeholder="Nom" name="name" required />
            </b-field>
            <b-field label="Type">
                <b-select placeholder="Veuillez choisir un type" v-model="form.type" expanded>
                    <option
                        v-for="option in types"
                        :value="option"
                        :key="option"
                        required>
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Coefficient">
                <b-numberinput v-model="form.Coefficient" min="1" required></b-numberinput>
            </b-field>
            <b-field label="Crédit">
                <b-numberinput v-model="form.credit" min="1" required></b-numberinput>
            </b-field>
            <b-field label="Charge horaire">
                <b-numberinput v-model="form.ChargeHoraire" min="1" required></b-numberinput>
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
  name: 'NewUEModal',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    Semid: {
      default: null
    }
  },
  data () {
    return {
      isNewUEModalActive: false,
      types: ['Fondamentale', 'Transversale', 'Méthodologie'],
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
      axios.post('http://localhost:8090/api/data/ues', {
        nom: this.form.nom,
        type: this.form.type,
        Coefficient: this.form.Coefficient,
        credit: this.form.credit,
        ChargeHoraire: this.form.ChargeHoraire,
        semestreId: this.Semid
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: "l'outil " + this.form.nom + ' bien ajoutée',
            queue: false
          })
          this.$emit('confirm')
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          this.$buefy.snackbar.open({
            type: 'is-warning',
            message: "Erreur d'insertion de l'unité",
            queue: false
          })
        })
    }
  },
  watch: {
    isActive (newValue) {
      this.isNewUEModalActive = newValue
    },
    isNewUEModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
