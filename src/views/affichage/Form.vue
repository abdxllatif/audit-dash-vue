<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table des formations
      <router-link slot="right" to="/insertion/formation" class="button">
        Nouvelle formation
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Formations" icon="account-multiple">
        <form-table :data-url="`${$router.options.base}data-sources/formations.json`" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import FormTable from '@/components/Tables/FormTable.vue'

export default {
  name: 'form',
  components: { HeroBar, TitleBar, CardComponent, FormTable },
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
