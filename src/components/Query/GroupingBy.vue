<template>
    <section>
        <b-collapse
            class="card"
            animation="slide"
            :open="isOpen == true"
            @open="isOpen = false">
            <div slot="trigger" slot-scope="props" class="card-header" type="is-dark" role="button" style="background-color: #ABCDEF">
              <p class="card-header-title">Grouping By</p>
              <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon></a>
            </div>
            <div class="card-content" style="background-color: #F1F3F6">
                <div class="block">
                  <b-radio v-model="form.radio"
                      name="name"
                      native-value="Rollup">
                      Rollup
                  </b-radio>
                  <b-radio v-model="form.radio"
                      name="name"
                      native-value="Cube">
                      Cube
                  </b-radio>
                  <b-radio v-model="form.radio"
                      name="name"
                      native-value="Sets">
                      Sets
                  </b-radio>
                </div>
                <b-button  type="is-primary" v-on:click="add">Ajouter</b-button>
                <b-field>
                    <b-input v-model="form.ordred" placeholder="Ordred By"></b-input>
                </b-field>
                <b-field>
                    <b-input v-model="form.partition" placeholder="Partition By"></b-input>
                </b-field>
            </div>
        </b-collapse>
    </section>
</template>

<script>
// import axios from 'axios'

export default {
  components: {
  },
  data () {
    return {
      form: {
        radio: '',
        ordred: '',
        partition: ''
      },
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
  mounted () {
    this.keys = Object.keys(this.tables)
    console.log(this.keys)
  },
  methods: {
    add: function () {
      console.log(this.form)
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
