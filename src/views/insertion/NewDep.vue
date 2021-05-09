<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Insertion
      <router-link slot="right" to="/dash" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Nouveau département" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Nom du département" horizontal>
            <b-field>
              <b-input icon="account" v-model="form.name" placeholder="Nom du département" name="name" required />
            </b-field>
          </b-field>
          <b-field label="Description" message="Ne pas dépasser 255 caractères" horizontal>
            <b-input type="textarea" placeholder="Une petite définition du département" v-model="form.description" maxlength="255" required/>
          </b-field>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Ajouter</b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'

export default {
  name: 'newDep',
  components: { HeroBar, CardComponent, TitleBar },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        description: null
      }
    }
  },
  computed: {
    titleStack () {
      return [
        'Insertion',
        'Departement'
      ]
    }
  },
  methods: {
    submit () {

    }
  }
}
</script>
