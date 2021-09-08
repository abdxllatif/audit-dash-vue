<template>
    <section>
        <b-collapse
            class="card"
            animation="slide"
            v-for="(tab, index) of tables"
            :key="index"
            :open="isOpen == index"
            @open="isOpen = index">
            <div slot="trigger" slot-scope="props" class="card-header" role="button">
              <p class="card-header-title">{{ tab.nom }}</p>
              <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon></a>
            </div>
            <att :tab="tab.atts"></att>
            <!--<div class="card-content">
                <draggable class="content" group="people" @change="log">
                  <div
                    class="box"
                    v-for="element in Object.keys(tab)"
                    :key="element"
                  >
                    {{ element }} {{ tab.table }}
                  </div>
                </draggable>
            </div>-->
        </b-collapse>

    </section>
</template>

<script>
import facts from '../../../public/data-sources/attributs.json'
// import axios from 'axios'
// import draggable from 'vuedraggable'
import Att from './Att.vue'

export default {
  components: {
    Att
  },
  data () {
    return {
      list1: [],
      isOpen: 0,
      tables: facts.facts,
      keys: []
    }
  },
  /* async created () {
    await axios
      .get('http://localhost:8090/api/bi/fact_data', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(r => {
        this.isLoading = false
        console.log(r.data.value)
        this.tables = r.data.value
      })
      .catch(e => {
        this.isLoading = false
        console.log(e)
        this.$buefy.toast.open({
          message: `Error: ${e.message}`,
          type: 'is-danger'
        })
      })
    this.keys = Object.keys(this.tables[0])
    console.log(this.keys)
  }, */
  mounted () {
    this.$forceUpdate()
    this.tables = facts.facts
    this.keys = Object.keys(this.tables)
    console.log(this.keys)
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
      window.console.log(evt)
    }
  }

}
</script>
