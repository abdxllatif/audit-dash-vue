<template>
  <b-modal :active.sync="isEditUEModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="pencil"></b-icon>
            Editer UE
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
  name: 'EditUEModal',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    UE: {
      default: null
    }
  },
  data () {
    return {
      ueId: this.UE,
      isEditUEModalActive: false,
      types: ['Fondamentale', 'Transversale', 'Méthodologie'],
      form: {}
    }
  },
  /* async mounted () {
    await axios.get('http://localhost:8090/api/data/ues/' + this.ueId, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then((response) => {
        console.log('response.data = ' + response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, */
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      console.log(this.UE)
      axios.post('http://localhost:8090/api/data/ues/' + this.UE, {
        nom: this.form.nom,
        type: this.form.type,
        Coefficient: this.form.Coefficient,
        credit: this.form.credit,
        ChargeHoraire: this.form.ChargeHoraire,
        semestreId: this.Semid,
        admin: this.$store.state.userEmail
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: "l'unité " + this.form.nom + ' bien modifiée',
            queue: false
          })
          this.$emit('confirm')
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
    }
  },
  watch: {
    isActive (newValue) {
      this.isEditUEModalActive = newValue
    },
    isEditUEModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
