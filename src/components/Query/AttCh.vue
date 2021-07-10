<template>
                <draggable class="content" :list="list" group="people" @change="log">
                  <b-collapse
                    class="card"
                    animation="slide"
                    v-for="element in list"
                    :key="element">
                    <template #trigger="props">
                      <div
                          class="card-header"
                          role="button">
                          <p class="card-header-title">
                              {{ element.nom }}
                          </p>
                          <a class="card-header-icon">
                              <b-icon
                                  :icon="props.open ? 'tune' : 'tune'">
                              </b-icon>
                          </a>
                      </div>
                    </template>
                    <div class="card-content">
                        <div class="content">
                            <div class="block">
                                <b-checkbox v-model="element.checkBoxGroup"
                                    native-value="sum">
                                    SUM
                                </b-checkbox>
                                <b-checkbox v-model="element.checkBoxGroup"
                                    native-value="avg">
                                    AVG
                                </b-checkbox>
                                <b-checkbox v-model="element.checkBoxGroup"
                                    native-value="min">
                                    MIN
                                </b-checkbox>
                                <b-checkbox v-model="element.checkBoxGroup"
                                    native-value="max">
                                    MAX
                                </b-checkbox>
                            </div>
                            <p class="content">
                                <b>Selection:</b>
                                {{ element.checkBoxGroup }}
                            </p>
                        </div>
                    </div>
                  </b-collapse>
                  <!--<div
                    class="box"
                    v-for="element in list"
                    :key="element"
                  >
                    {{ element.nom }}
                    <b-button class="is-info" style="float: right"> k </b-button>
                  </div>-->
                </draggable>
</template>

<script>
// import axios from 'axios'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    list: []
  },
  data () {
    return {
      obj: [],
      list1: [],
      isOpen: 0,
      tables: [],
      keys: [],
      checkboxGroup: []
    }
  },
  created () {
    /* this.keys = Object.keys(this.tab)
    delete this.keys[0]
    console.log(this.keys)
    const text = '[]'
    this.obj = JSON.parse(text)
    for (let i = 1; i < this.keys.length; i++) {
      this.obj.push({ nom: this.keys[i], table: this.tab.table })
    }
    console.log('yes')
    console.log(this.obj) */
  },
  methods: {
    log: function (evt) {
      this.$store.state.dims = []
      for (let i = 0; i < this.list.length; i++) {
        const a = this.list[i].dims
        for (let j = 0; j < a.length; j++) {
          let count = 0
          for (let z = 0; z < this.$store.state.dims.length; z++) {
            if (a[j].nom === this.$store.state.dims[z].nom) {
              count++
            }
          }
          if (count === 0) {
            this.$store.state.dims.push(a[j])
          }
        }
      }
      console.log(this.$store.state.dims)
      this.$store.state.atts = []
      this.$store.state.atts = this.list
      console.log(this.list)
      window.console.log(evt)
    }
  }

}
</script>
