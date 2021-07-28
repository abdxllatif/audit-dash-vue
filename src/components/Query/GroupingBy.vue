<template>
    <section>
        <b-collapse
            class="card"
            animation="slide"
            :open="isOpen == true"
            @open="isOpen = false">
            <div slot="trigger" slot-scope="props" class="card-header" type="is-dark" role="button" style="background-color: #ABCDEF">
              <p class="card-header-title">Options</p>
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
                  <b-radio v-model="form.radio"
                      name="name"
                      native-value="Orderby"
                      @input="log">
                      Orderby
                  </b-radio>
                </div>
                <div v-if="form.radio != ''" style="background-color: white; padding:10px">
                  <b-field v-if="form.radio != 'Orderby'" label="Attribut" horizontal>
                    <b-select placeholder="Selectionne un attribut" v-model="form.att" required>
                      <option v-for="(att, index) in this.$store.state.attDim" :key="index" :value="att">
                        {{ att.nom + ' : ' }} <i>{{ att.dimTable }}</i>
                      </option>
                    </b-select>
                  </b-field>
                  <b-field v-if="form.radio == 'Orderby'" label="Attribut" horizontal>
                    <b-select placeholder="Selectionne attribut" v-model="form.item" required>
                      <option v-for="(item, index) in this.$store.state.checked" :key="index" :value="item">
                        {{ item }}
                      </option>
                    </b-select>
                    <div>
                      <b-radio v-model="form.tri"
                        name="tri"
                        native-value="ASC">
                        ASC
                      </b-radio>
                      <b-radio v-model="form.tri"
                          name="tri"
                          native-value="DESC">
                          DESC
                      </b-radio>
                    </div>
                  </b-field>
                </div>
                <b-button  type="is-primary" v-on:click="add">Ajouter</b-button>
                <p><b>Rollup : </b> {{ this.rollup }} </p>
                <p><b>Cube : </b> {{ this.cube }} </p>
                <p><b>Sets : </b> {{ this.sets }} </p>
                <p><b>OrderBy : </b> {{ this.orderby }} </p>
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
        att: null,
        tri: '',
        item: null
      },
      isOpen: 0,
      tables: [],
      keys: [],
      rollup: [],
      cube: [],
      sets: [],
      orderby: []
    }
  },
  mounted () {
    this.keys = Object.keys(this.tables)
    console.log(this.keys)
    this.$store.state.Xes = []
    this.rigl()
    // this.rollup = this.$store.state.RollUp
  },
  methods: {
    add: function () {
      // console.log(this.form.item)
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
              this.rollup.push(this.form.att.nom)
              this.$store.state.Xes.push(this.form.att.nom)
            }
            count++
          }
        }
        if (count === 0) {
          this.$store.state.RollUp.push({ name: this.form.att.dimTable, params: [this.form.att.nom] })
          this.rollup.push(this.form.att.nom)
          this.$store.state.Xes.push(this.form.att.nom)
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
              this.cube.push(this.form.att.nom)
              this.$store.state.Xes.push(this.form.att.nom)
            }
            count++
          }
        }
        if (count === 0) {
          this.$store.state.Cube.push({ name: this.form.att.dimTable, params: [this.form.att.nom] })
          this.cube.push(this.form.att.nom)
          this.$store.state.Xes.push(this.form.att.nom)
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
              this.sets.push(this.form.att.nom)
              this.$store.state.Xes.push(this.form.att.nom)
            }
            count++
          }
        }
        if (count === 0) {
          this.$store.state.GroupBy.push({ name: this.form.att.dimTable, params: [this.form.att.nom] })
          this.sets.push(this.form.att.nom)
          this.$store.state.Xes.push(this.form.att.nom)
        }
      } else if (this.form.radio === 'Orderby') {
        this.$store.state.isOrderBy = true
        let count = 0
        for (let i = 0; i < this.$store.state.OrderBy.length; i++) {
          if (this.$store.state.OrderBy[i] === this.form.item) {
            alert('deja ajouté')
            count++
          }
        }
        if (count === 0) {
          this.$store.state.OrderBy.push(this.form.item)
          this.orderby.push(this.form.item + ' ' + this.form.tri)
        }
      } else {
        alert('rien ajouté')
      }
      // console.log(this.form)
    },
    rigl: function () {
      if (this.$store.state.RollUp !== []) {
        for (let i = 0; i < this.$store.state.RollUp.length; i++) {
          for (let j = 0; j < this.$store.state.RollUp[i].params.length; j++) {
            this.rollup.push(this.$store.state.RollUp[i].params[j])
            this.$store.state.Xes.push(this.$store.state.RollUp[i].params[j])
          }
        }
      }
      if (this.$store.state.Cube !== []) {
        for (let i = 0; i < this.$store.state.Cube.length; i++) {
          for (let j = 0; j < this.$store.state.Cube[i].params.length; j++) {
            this.cube.push(this.$store.state.Cube[i].params[j])
            this.$store.state.Xes.push(this.$store.state.Cube[i].params[j])
          }
        }
      }
      if (this.$store.state.GroupBy !== []) {
        for (let i = 0; i < this.$store.state.GroupBy.length; i++) {
          for (let j = 0; j < this.$store.state.GroupBy[i].params.length; j++) {
            this.sets.push(this.$store.state.GroupBy[i].params[j])
            this.$store.state.Xes.push(this.$store.state.GroupBy[i].params[j])
          }
        }
      }
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log: function () {
      const atts = this.$store.state.atts
      this.$store.state.checked = []
      for (let i = 0; i < atts.length; i++) {
        const vars = []
        for (let x = 0; x < atts[i].checkBoxGroup.length; x++) {
          if (atts[i].checkBoxGroup[x] === 'sum') {
            vars.push('sum(' + atts[i].nom + ')')
            this.$store.state.checked.push('sum(' + atts[i].nom + ')')
          }
          if (atts[i].checkBoxGroup[x] === 'avg') {
            vars.push('avg(' + atts[i].nom + ')')
            this.$store.state.checked.push('avg(' + atts[i].nom + ')')
          }
          if (atts[i].checkBoxGroup[x] === 'max') {
            vars.push('max(' + atts[i].nom + ')')
            this.$store.state.checked.push('max(' + atts[i].nom + ')')
          }
          if (atts[i].checkBoxGroup[x] === 'min') {
            vars.push('min(' + atts[i].nom + ')')
            this.$store.state.checked.push('min(' + atts[i].nom + ')')
          }
        }
      }
      window.console.log(this.$store.state.checked)
    }
  }

}
</script>
