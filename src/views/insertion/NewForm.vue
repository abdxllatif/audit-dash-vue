<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Forms
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Nouvelle formation" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Départment" horizontal>
            <b-select placeholder="Selectionne un départment" v-model="form.department" required>
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Titre" message="Titre de la formation" horizontal>
            <b-input placeholder="e.g. ingenieur des systèmes informatiques" v-model="form.titre" required />
          </b-field>
          <b-field label="Description" message="Ne pas dépasser 255 caractères" horizontal>
            <b-input type="textarea" placeholder="Une petite définition de la formation" v-model="form.description" maxlength="255" required/>
          </b-field>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Submit</b-button>
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
  name: 'newForm',
  components: { HeroBar, CardComponent, TitleBar },
  data () {
    return {
      isLoading: false,
      form: {
        department: null,
        titre: null,
        description: null
      },
      departments: [
        'Informatique',
        'Economie',
        'Electronique'
      ]
    }
  },
  computed: {
    titleStack () {
      return [
        'Insertion',
        'Formation'
      ]
    }
  },
  methods: {
    submit () {

    }
  }
}
</script>
