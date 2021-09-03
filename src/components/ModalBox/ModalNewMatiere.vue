<template>
  <b-modal :active.sync="isNewMatiereModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
            <b-icon class="mx-4" icon="note"></b-icon>
            Ajouter une nouvelle matière
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
                <b-numberinput v-model="form.coefficient" min="1" required></b-numberinput>
            </b-field>
            <b-field label="Crédit">
                <b-numberinput v-model="form.credit" min="1" required></b-numberinput>
            </b-field>
            <b-field label="Charge horaire">
                <b-numberinput v-model="form.chargeHoraire" min="1" required></b-numberinput>
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
  name: 'NewMatiereModal',
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
      UEid: this.UE,
      isNewMatiereModalActive: false,
      types: ['Fondamentale', 'Transversale', 'Méthodologie'],
      form: {}
    }
  },
  mounted () {
  },
  methods: {
    cancel () {
      console.log(this.UE)
      this.$emit('cancel')
    },
    confirm () {
      console.log(this.UEid)
      axios.post('http://localhost:8080/api/data/matieres', {
        nom: this.form.nom,
        type: this.form.type,
        Coefficient: this.form.coefficient,
        credit: this.form.credit,
        ChargeHoraire: this.form.chargeHoraire,
        ueId: this.UE
      }, { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(response => {
          this.$buefy.snackbar.open({
            message: "l'outil " + this.form.nom + ' bien ajoutée',
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
      this.isNewMatiereModalActive = newValue
    },
    isNewMatiereModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
