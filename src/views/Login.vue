<template>
    <section class="section is-main-section">
        <card-component title="S'identifier" icon="account-circle">
            <form @submit.prevent="submit">
                <b-field horizontal label="Nom d'utilisateur" message="Obligatoire. Votre nom d'utilisateur">
                    <b-input v-model="form.username" name="name" required/>
                </b-field>
                <b-field horizontal label="Mot de passe" message="Obligatoire. Votre mot de passe">
                    <b-input v-model="form.password" name="email" type="password" required/>
                </b-field>
                <hr>
                <b-field horizontal>
                    <div class="control">
                        <button type="submit" class="button is-primary" :class="{'is-loading':isLoading}">
                            S'identifier
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
  name: 'login',
  components: {
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      form: {
        username: '',
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
    this.form.password = ''
  },
  methods: {
    submit () {
      this.isLoading = true
      axios.post('http://localhost:8080/api/auth/signin', {
        username: this.form.username,
        password: this.form.password
      })
        .then(response => {
          this.$store.isLog = true
          this.$store.username = this.form.username
          console.log(response)
          this.$session.start()
          this.$session.set('jwt', response.data.accesToken)
          console.log(this.$store.isLog)
          console.log(this.$store.username)
          this.$buefy.snackbar.open({
            message: 'Bienvenue' + this.$store.username,
            queue: false
          })
          this.$store.commit('user', {
            name: this.$store.username,
            email: 'guest@auditdash.com',
            avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
          })
          this.$router.push({ name: 'dash' })
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
        this.$store.commit('user', this.form)
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
