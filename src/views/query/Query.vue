<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
        <tiles>
            <card-component title="Liste des attributs" class="tile is-child">
                <list-att></list-att>
            </card-component>
            <card-component title="Attributs choisis" class="tile is-child">
                <att-ch :list="list2"></att-ch>
            </card-component>
            <card-component title="Liste des dimentions" class="tile is-child">
                <b-collapse
                    class="card"
                    animation="slide"
                    v-for="(dim, index) of this.$store.state.dims"
                    :key="index"
                    :open="isOpen == false"
                    @open="isOpen = true">
                    <div slot="trigger" slot-scope="props" class="card-header" role="button">
                      <p class="card-header-title">{{ dim.nom }}</p>
                      <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon></a>
                    </div>
                    <simple-att :dim="dim.atts"></simple-att>
                </b-collapse>
                <grouping-by></grouping-by>
            </card-component>
        </tiles>
        <div><b-button class="is-success" style="float: right" v-on:click="show">Done</b-button></div>
    </section>
  </div>
</template>

<script>
import facts from '../../../public/data-sources/attributs.json'
import TitleBar from '@/components/TitleBar'
// import axios from 'axios'
import Tiles from '../../components/Tiles.vue'
import CardComponent from '@/components/CardComponent'
import ListAtt from '../../components/Query/ListAtt.vue'
// import draggable from 'vuedraggable'
import GroupingBy from '../../components/Query/GroupingBy.vue'
import AttCh from '../../components/Query/AttCh.vue'
import SimpleAtt from '../../components/Query/SimpleAtt.vue'

export default {
  name: 'QueryCreator',
  components: { TitleBar, Tiles, CardComponent, ListAtt, GroupingBy, AttCh, SimpleAtt },
  computed: {
    titleStack () {
      return [
        'Statistics',
        'Query Creator'
      ]
    }
  },
  mounted () {
    console.log('here')
    console.log(facts.facts)
  },
  data () {
    return {
      total: 0,
      list2: [],
      facts: facts,
      dims: []
    }
  },
  methods: {
    show: function () {
      let query = ''
      query = 'SELECT ' + 'FROM'
      alert('this is the query \n' + query)
    },
    add: function () {
      this.list.push({ name: 'Juan' })
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log: function (evt) {
      console.log(this.list2)
      // window.console.log(evt)
      console.log(evt)
    }
  }
}
</script>
