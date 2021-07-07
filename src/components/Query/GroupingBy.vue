<template>
    <section>
        <b-collapse
            class="card"
            animation="slide"
            :open="isOpen == index"
            @open="isOpen = index">
            <div slot="trigger" slot-scope="props" class="card-header" role="button">
              <p class="card-header-title">Grouping By</p>
              <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon></a>
            </div>
            <div class="card-content">
                <div class="block">
                  <b-radio v-model="radio"
                      name="name"
                      native-value="Rollup">
                      Rollup
                  </b-radio>
                  <b-radio v-model="radio"
                      name="name"
                      native-value="Cube">
                      Cube
                  </b-radio>
                  <b-radio v-model="radio"
                      name="name"
                      native-value="Sets">
                      Sets
                  </b-radio>
                </div>
                <b-button  type="is-primary">Ajouter</b-button>
                <b-field>
                    <b-input v-model="name" placeholder="Ordred By"></b-input>
                </b-field>
                <b-field>
                    <b-input v-model="name" placeholder="Partition By"></b-input>
                </b-field>
            </div>
        </b-collapse>
    </section>
</template>

<script>
import axios from 'axios'

export default {
  components: {
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
      keys: [],
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
  async created () {
    await axios
      .get('http://localhost:8080/api/bi/data', { headers: { 'x-access-token': this.$session.get('jwt') } })
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
  },
  mounted () {
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
