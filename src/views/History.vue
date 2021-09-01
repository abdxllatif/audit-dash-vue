<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Historique
    </hero-bar>
    <section class="section is-main-section">
        <history-table data-url=""></history-table>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import HistoryTable from '@/components/Tables/HistoryTable.vue'

/* eslint-disable */
export default {
  name: 'History',
  components: {
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar,
    HistoryTable
  },
  data () {
    return {
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Historique'
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
