<template>
    <section>
        <b-collapse
            class="card"
            animation="slide"
            v-for="(collapse, index) of collapses"
            :key="index"
            :open="isOpen == index"
            @open="isOpen = index">
            <div slot="trigger" slot-scope="props" class="card-header" role="button">
              <p class="card-header-title">{{ collapse.title }}</p>
              <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon></a>
            </div>
            <div class="card-content">
                <draggable class="content" :list="list1" group="people" @change="log">
                  <div
                    class="box"
                    v-for="(element, index) in list1"
                    :key="element.name"
                  >
                    {{ element.name }} {{ index }}
                  </div>
                </draggable>
            </div>
        </b-collapse>

    </section>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data () {
    return {
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 }
      ],
      isOpen: 0,
      tables: [],
      collapses: [
        {
          title: 'Fait_Etudiants',
          att: [
            {
              nom: 'Moyenne'
            },
            {
              nom: 'residence'
            },
            {
              nom: 'khobz'
            }
          ]
        },
        {
          title: 'Title 2',
          text: 'Text 2'
        },
        {
          title: 'Title 3',
          text: 'Text 3'
        }
      ]
    }
  },
  created () {
    axios
      .get('http://localhost:8080/api/bi/data', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(r => {
        this.isLoading = false
        console.log(r)
      })
      .catch(e => {
        this.isLoading = false
        console.log(e)
        this.$buefy.toast.open({
          message: `Error: ${e.message}`,
          type: 'is-danger'
        })
      })
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
