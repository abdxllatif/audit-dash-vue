<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des départements
      <router-link slot="right" to="/insertion/departement" class="button">
        Nouveau département
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Départements" icon="account-multiple">
        <dep-table :data-url="`${$router.options.base}data-sources/deps.json`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import DepTable from '@/components/Tables/DepTable.vue'

export default {
  name: 'Tables',
  components: { HeroBar, TitleBar, CardComponent, DepTable },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Département'
      ]
    }
  }
}
</script>
