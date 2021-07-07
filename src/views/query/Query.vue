<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
        <tiles>
            <card-component title="Liste des attributs" class="tile is-child">
                <list-att></list-att>
            </card-component>
            <card-component title="Attributs choisis" class="tile is-child">
                <draggable class="box" :list="list2" group="people" @change="log">
                  <div
                    class="box"
                    v-for="(element, index) in list2"
                    :key="element.name"
                  >
                    {{ element }} {{ index }}
                  </div>
                </draggable>
            </card-component>
            <card-component title="Liste des dimentions" class="tile is-child">
                <grouping-by></grouping-by>
            </card-component>
        </tiles>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
// import axios from 'axios'
import Tiles from '../../components/Tiles.vue'
import CardComponent from '@/components/CardComponent'
import ListAtt from '../../components/Query/ListAtt.vue'
import draggable from 'vuedraggable'
import GroupingBy from '../../components/Query/GroupingBy.vue'

export default {
  name: 'QueryCreator',
  components: { TitleBar, Tiles, CardComponent, ListAtt, draggable, GroupingBy },
  computed: {
    titleStack () {
      return [
        'Tables',
        'Activités'
      ]
    }
  },
  data () {
    return {
      total: 0,
      list2: []
    }
  },
  methods: {
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
