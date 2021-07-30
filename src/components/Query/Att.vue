<template>
            <div class="card-content py-1">
                <draggable class="content" :list="tab" group="people" @change="log">
                  <div
                    class="box my-2 py-2"
                    v-for="element in tab"
                    :key="element"
                  >
                    {{ element.nom }}
                  </div>
                </draggable>
            </div>
</template>

<script>
// import axios from 'axios'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    tab: {}
  },
  data () {
    return {
      obj: [],
      list1: [],
      isOpen: 0,
      tables: [],
      keys: []
    }
  },
  created () {
    this.keys = Object.keys(this.tab)
    delete this.keys[0]
    console.log(this.keys)
    const text = '[]'
    this.obj = JSON.parse(text)
    for (let i = 1; i < this.keys.length; i++) {
      this.obj.push({ nom: this.keys[i], table: this.tab.table })
    }
    console.log('yes')
    console.log(this.obj)
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
