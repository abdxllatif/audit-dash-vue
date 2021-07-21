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
                  <b-radio
                      v-model="form.radio"
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
                <b-field v-if="form.radio != ''" label="Attribut" horizontal>
                  <b-select placeholder="Selectionne un attribut" v-model="form.att" required>
                    <option v-for="(att, index) in this.$store.state.attDim" :key="index" :value="att">
                      {{ att.nom + ' : ' }} <i>{{ att.dimTable }}</i>
                    </option>
                  </b-select>
                  <b-input v-if="$route.params.sel!=null" v-model="$route.params.sel.nom" custom-class="is-static" readonly/>
                </b-field>
                <b-button  type="is-primary" v-on:click="add">Ajouter</b-button>
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
        att: null
      },
      isOpen: 0,
      tables: [],
      keys: []
    }
  },
  mounted () {
    this.keys = Object.keys(this.tables)
    console.log(this.keys)
  },
  methods: {
    add: function () {
      console.log(this.form.att)
      if (this.form.radio === 'Rollup') {
        this.$store.state.isGroupBy = true
        this.$store.state.isRollUp = true
        let count = 0
        for (let i = 0; i < this.$store.state.RollUp.length; i++) {
          if (this.$store.state.RollUp[i].name === this.form.att.dimTable) {
            let count2 = 0
            for (let j = 0; j < this.$store.state.RollUp[i].params.length; j++) {
              if (this.$store.state.RollUp[i].params[j] === this.form.att.nom) {
                count2++
                alert('deja ajouté')
              }
            }
            if (count2 === 0) {
              this.$store.state.RollUp[i].params.push(this.form.att.nom)
            }
            count++
          }
        }
        if (count === 0) {
          this.$store.state.RollUp.push({ name: this.form.att.dimTable, params: [this.form.att.nom] })
        }
      } else if (this.form.radio === 'Cube') {
        this.$store.state.isGroupBy = true
        this.$store.state.isCube = true
        let count = 0
        for (let i = 0; i < this.$store.state.Cube.length; i++) {
          if (this.$store.state.Cube[i].name === this.form.att.dimTable) {
            let count2 = 0
            for (let j = 0; j < this.$store.state.Cube[i].params.length; j++) {
              if (this.$store.state.Cube[i].params[j] === this.form.att.nom) {
                count2++
                alert('deja ajouté')
              }
            }
            if (count2 === 0) {
              this.$store.state.Cube[i].params.push(this.form.att.nom)
              console.log('zedt' + this.form.att.nom + 'bla table')
            }
            count++
          }
        }
        if (count === 0) {
          this.$store.state.Cube.push({ name: this.form.att.dimTable, params: [this.form.att.nom] })
          console.log('zedt : ' + this.form.att.nom + ' b table : ' + this.form.att.dimTable)
        }
      } else if (this.form.radio === 'Sets') {
        this.$store.state.isGroupBy = true
        let count = 0
        for (let i = 0; i < this.$store.state.GroupBy.length; i++) {
          if (this.$store.state.GroupBy[i].name === this.form.att.dimTable) {
            let count2 = 0
            for (let j = 0; j < this.$store.state.GroupBy[i].params.length; j++) {
              if (this.$store.state.GroupBy[i].params[j] === this.form.att.nom) {
                count2++
                alert('deja ajouté')
              }
            }
            if (count2 === 0) {
              this.$store.state.GroupBy[i].params.push(this.form.att.nom)
            }
            count++
          }
        }
        if (count === 0) {
          this.$store.state.GroupBy.push({ name: this.form.att.dimTable, params: [this.form.att.nom] })
        }
      } else {
        alert('rien ajouté')
      }
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
