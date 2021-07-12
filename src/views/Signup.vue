<template>
    <section class="section is-main-section">
        <card-component title="S'enregistrer" icon="account-circle">
            <form @submit.prevent="submit">
                <b-field horizontal label="Nom d'utilisateur" message="Obligatoire. Votre nom d'utilisateur">
                    <b-input v-model="form.username" name="name" required/>
                </b-field>
                <b-field horizontal label="email" message="Obligatoire. Votre email">
                    <b-input v-model="form.email" name="email" required/>
                </b-field>
                <b-field horizontal label="Mot de passe" message="Obligatoire. Votre mot de passe">
                    <b-input v-model="form.password" name="password" type="password" required/>
                </b-field>
                <hr>
                <b-field horizontal>
                    <div class="control">
                        <button type="submit" class="button is-primary" :class="{'is-loading':isLoading}">
                            S'enregistrer
                        </button>
                    </div>
                </b-field>
            </form>
        </card-component>
    </section>
</template>
<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import axios from 'axios'

export default {
  name: 'signup',
  components: {
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      form: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState([
      'userName',
      'userEmail'
    ])
  },
  mounted () {
    this.form.username = ''
    this.form.email = ''
    this.form.password = ''
  },
  methods: {
    submit () {
      this.isLoading = true
      axios.post('http://localhost:8080/api/auth/signup', {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password
      })
        .then(response => {
          console.log(response)
          this.$buefy.snackbar.open({
            message: 'bien enregistré ' + this.form.username,
            queue: false
          })
          this.$router.push({ name: 'login' })
        })
        .catch(e => {
          this.errorMessage = e.message
          console.log('There was an error!', e)
          this.$buefy.snackbar.open({
            type: 'is-warning',
            message: 'Veuillez verifier de nouveau',
            queue: false
          })
        })
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    }
  },
  watch: {
    userName (newValue) {
      this.form.name = newValue
    },
    userEmail (newValue) {
      this.form.email = newValue
    }
  }
}

</script>
