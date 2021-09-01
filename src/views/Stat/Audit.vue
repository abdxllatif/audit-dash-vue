<template>
  <div>
    <modal-chart-view :is-active="isModalChartViewActive" :data="this.data" :options="this.options" :ChartData="this.ChartData"
               @cancel="cancel"/>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Audit Social
    </hero-bar>
    <section class="section is-main-section">
      <b-tabs position="is-centered" class="block" type="is-toggle-rounded" expanded>
            <b-tab-item label="Pédagogie" icon="school">
              <b-tabs position="is-centered" class="block">
                  <b-tab-item label="Résultats" icon="view-list">
                    <b-tabs class="block" type="is-toggle" vertical>
                      <b-tab-item label="Départements">
                        <b style="font-size: 20px">Nombre de départements :</b><br>
                        {{ totalDep }}
                      </b-tab-item>
                      <b-tab-item label="Formations">
                        <b style="font-size: 20px">Nombre de formations :</b><br>
                        {{ totalFrm }}
                      </b-tab-item>
                      <b-tab-item label="Partenaires">
                        <b style="font-size: 20px">Nombre de partenaires :</b><br>
                        {{ totalPar }}
                      </b-tab-item>
                      <b-tab-item label="Clubs">
                        <b style="font-size: 20px">Nombre de clubs :</b><br>
                        {{ totalClb }}
                      </b-tab-item>
                      <b-tab-item label="Activités">
                        <b style="font-size: 20px">Nombre d'activités :</b><br>
                        {{ totalAct }}
                      </b-tab-item>
                    </b-tabs>
                  </b-tab-item>
                  <b-tab-item label="Graphes" icon="chart-timeline-variant">
                    <tiles>
                      <b-button class="is-info" @click="Activation(EnsSocData.chartData)" expanded>Etudiants par</b-button>
                      <b-button class="is-info" @click="Activation(EtdSexData.chartData)" expanded>Etudiants par sex</b-button>
                      <b-button class="is-info" @click="Activation(SallesData.chartData)" expanded>Etudiants par</b-button>
                      <b-button class="is-info" @click="Activation(SallesData.chartData)" expanded>Etudiants par</b-button>
                      <!--<b-collapse class="tile is-child" style="width: 100%" :open="false" aria-id="contentIdForA11y1">
                          <template #trigger>
                              <b-button
                                  label="Graphe des étudiants par sex"
                                  type="is-primary"
                                  aria-controls="contentIdForA11y1" />
                          </template>
                          <div class="notification">
                              <div class="content">
                                  <d-chart :chart-data="this.EnsSocData.chartData"></d-chart>
                              </div>
                          </div>
                      </b-collapse>-->
                    </tiles>
                    <tiles>
                      <b-button class="is-info" @click="Activation(EnsSocData.chartData)" expanded>Enseignants par situation sociale</b-button>
                      <b-button class="is-info" @click="Activation(EnsSexData.chartData)" expanded>Enseignants par sex</b-button>
                      <b-button class="is-info" @click="Activation(EnsGrdData.chartData)" expanded>Enseignants par grade</b-button>
                      <b-button class="is-info" @click="Activation(EnsSpeData.chartData)" expanded>Enseignants par spécialité</b-button>
                    </tiles>
                    <tiles>
                      <b-button class="is-info" @click="Activation(EnsSocData.chartData)" expanded>Partenaires par type</b-button>
                      <b-button class="is-info" @click="Activation(EnsSexData.chartData)" expanded>Enseignants par sex</b-button>
                      <b-button class="is-info" @click="Activation(EnsGrdData.chartData)" expanded>Enseignants par grade</b-button>
                      <b-button class="is-info" @click="Activation(EnsSpeData.chartData)" expanded>Enseignants par spécialité</b-button>
                    </tiles>
                  </b-tab-item>
              </b-tabs>
            </b-tab-item>
            <b-tab-item label="Personnel" icon="account-multiple">
              <b-tabs position="is-centered" class="block">
                  <b-tab-item label="Résultats" icon="view-list">
                    <b-tabs class="block" type="is-toggle" vertical>
                      <b-tab-item label="Etudiants">
                        <b style="font-size: 20px">Nombre d'étudiants :</b><br>
                        {{ totalEtd }}<br>
                      </b-tab-item>
                      <b-tab-item label="Enseignants">
                        <b style="font-size: 20px">Nombre d'enseignants :</b><br>
                        {{ totalEns }}<br>
                      </b-tab-item>
                      <b-tab-item label="Taux d'encadrement">
                        <b>Nombre d'étudiants :</b> {{ totalEtd }}<br>
                        <b>Nombre d'enseignants :</b> {{ totalEns }}<br><hr>
                        <b>taux d'encadrement</b> <i>(enseignants/etudiants)</i> : 1/{{ this.tauxEnc.total }}<br>
                        <b>taux d'encadrement par spécialité :</b><br>
                        <b class="ml-5">Mathématique :</b> 1/{{ this.tauxEnc.specialite.Math }}<br>
                        <b class="ml-5">Informatique :</b> 1/{{ this.tauxEnc.specialite.Info }}<br>
                        <b class="ml-5">Electronique :</b> 1/{{ this.tauxEnc.specialite.Elec }}<br>
                        <b class="ml-5">Langue :</b> 1/{{ this.tauxEnc.specialite.Lang }}<br>
                      </b-tab-item>
                      <b-tab-item label="Administratifs">
                        <b style="font-size: 20px">Nombre d'administratifs :</b><br>
                        {{ totalAdm }}<br>
                      </b-tab-item>
                      <b-tab-item label="Doctorants">
                        <b style="font-size: 20px">Nombre des doctorants :</b><br>
                        {{ totalDoc }}<br>
                      </b-tab-item>
                    </b-tabs>
                  </b-tab-item>
                  <b-tab-item label="Graphes" icon="chart-timeline-variant">
                    <tiles>
                      <card-component class="tile is-child">
                        <p class="">Veuillez choisir un graphe:</p><br>
                        <b-field>
                            <b-radio v-model="radio"
                                native-value="none">
                                None
                            </b-radio>
                        </b-field>
                        <b-field>
                            <b-radio v-model="radio"
                                native-value="EtdSex">
                                étudiants par sex
                            </b-radio>
                        </b-field>
                        <b-field>
                            <b-radio v-model="radio"
                                native-value="EtdDep">
                                étudiants par départements
                            </b-radio>
                        </b-field>
                        <b-field>
                            <b-radio v-model="radio"
                                native-value="EnsSex">
                                Enseignants par sex
                            </b-radio>
                        </b-field>
                        <b-field>
                            <b-radio v-model="radio"
                                native-value="EnsSpe">
                                Enseignants par spécialité
                            </b-radio>
                        </b-field>
                        <b-field>
                            <b-radio v-model="radio"
                                native-value="EnsGrd">
                                Enseignants par Grade
                            </b-radio>
                        </b-field>
                        <b-field>
                            <b-radio v-model="radio"
                                native-value="EnsSoc">
                                Enseignants par Situation sociale
                            </b-radio>
                        </b-field>
                      </card-component>
                      <card-component class="tile is-child" title="Graphe choisi" icon="finance">
                        <p v-if="this.radio === 'none'"></p>
                        <d-chart v-if="this.radio === 'EtdSex'" :chart-data="this.EtdSexData.chartData"></d-chart>
                        <d-chart v-if="this.radio === 'EtdDep'" :chart-data="this.SallesData.chartData"></d-chart>
                        <d-chart v-if="this.radio === 'EnsSex'" :chart-data="this.EnsSexData.chartData"></d-chart>
                        <d-chart v-if="this.radio === 'EnsSpe'" :chart-data="this.EnsSpeData.chartData"></d-chart>
                        <d-chart v-if="this.radio === 'EnsGrd'" :chart-data="this.EnsGrdData.chartData"></d-chart>
                        <d-chart v-if="this.radio === 'EnsSoc'" :chart-data="this.EnsSocData.chartData"></d-chart>
                      </card-component>
                    </tiles>
                  </b-tab-item>
              </b-tabs>
            </b-tab-item>
            <b-tab-item label="Logistiques" icon="tools">
                    <b-tabs class="block" type="is-boxed" vertical>
                      <b-tab-item label="Salles">
                        <b-tabs position="is-centered" class="block">
                          <b-tab-item label="Résultats" icon="view-list">
                            <tiles>
                              <section class="tile is-child">
                                <b style="font-size: 20px">Nombre des salles :</b><br>
                                <b class="ml-2">Total :</b> {{ totalSal }}<br>
                              </section>
                              <section class="tile is-child">
                                <b-collapse :open="false" aria-id="contentIdForA11y1">
                                    <template #trigger>
                                        <b-button
                                            label="Filtres"
                                            type="is-primary"
                                            aria-controls="contentIdForA11y1" />
                                    </template>
                                    <div class="notification">
                                        <div class="content">
                                            <b-field label="Type">
                                              <b-radio v-model="salles.salleFilter.type" @input="UpdateSalleData"
                                                  native-value="none">
                                                  Total
                                              </b-radio>
                                              <b-radio v-model="salles.salleFilter.type" @input="UpdateSalleData"
                                                  native-value="Salle TD">
                                                  TD
                                              </b-radio>
                                              <b-radio v-model="salles.salleFilter.type" @input="UpdateSalleData"
                                                  native-value="Salle TP">
                                                  TP
                                              </b-radio>
                                              <b-radio v-model="salles.salleFilter.type" @input="UpdateSalleData"
                                                  native-value="Amphi">
                                                  Amphi
                                              </b-radio>
                                              <b-radio v-model="salles.salleFilter.type" @input="UpdateSalleData"
                                                  native-value="bureau">
                                                  Bureau
                                              </b-radio>
                                              <b-radio v-model="salles.salleFilter.type" @input="UpdateSalleData"
                                                  native-value="autres">
                                                  Autres
                                              </b-radio>
                                          </b-field>
                                          <b-field label="Capacité">
                                              <b-radio v-model="salles.salleFilter.capacite" @input="UpdateSalleData"
                                                  native-value="none">
                                                  Total
                                              </b-radio>
                                              <b-radio v-model="salles.salleFilter.capacite" @input="UpdateSalleData"
                                                  native-value="Bas">
                                                  Moins de 50
                                              </b-radio>
                                              <b-radio v-model="salles.salleFilter.capacite" @input="UpdateSalleData"
                                                  native-value="Moyen">
                                                  Entre 50 et 100
                                              </b-radio>
                                              <b-radio v-model="salles.salleFilter.capacite" @input="UpdateSalleData"
                                                  native-value="Haut">
                                                  Plus que 100
                                              </b-radio>
                                          </b-field>
                                        </div>
                                    </div>
                                </b-collapse>
                              </section>
                            </tiles>
                            <tiles>
                              <section class="tile is-child">
                                <b class="ml-2">Par type :</b> <br>
                                <b class="ml-5">Amphi :</b> {{ this.salles.data.filter(obj => obj.type === 'Amphi').length }}<br>
                                <b class="ml-5">Salle TD :</b> {{ this.salles.data.filter(obj => obj.type === 'Salle TD').length }}<br>
                                <b class="ml-5">Salle TP :</b> {{ this.salles.data.filter(obj => obj.type === 'Salle TP').length }}<br>
                                <b class="ml-5">Bureau :</b> {{ this.salles.data.filter(obj => obj.type === 'bureau').length }}<br>
                                <b class="ml-5">Autres :</b> {{ this.salles.data.filter(obj => obj.type === 'autres').length }}<br>
                              </section>
                              <section class="tile is-child">
                                <b class="ml-2">Par capacité :</b> <br>
                                <b class="ml-5">Moins de 50 :</b> {{/* eslint-disable */ this.salles.data.filter(obj => obj.capacite < 50).length /* eslint-disable */}}<br>
                                <b class="ml-5">Entre 50 et 100 :</b> {{ this.salles.data.filter(obj => ((obj.capacite >= 50) && (obj.capacite < 100))).length }}<br>
                                <b class="ml-5">Plus que 100 :</b> {{ this.salles.data.filter(obj => obj.capacite >= 100).length }}<br>
                              </section>
                            </tiles>
                          </b-tab-item>
                          <b-tab-item label="Graphes" icon="view-list">
                            <tiles>
                              <!--<card-component class="tile is-child" title="Salles" icon="finance">
                                <apexchart height="200%" type="pie" :options="options" :series="data"></apexchart>
                                <d-chart :chart-data="this.SallesData.chartData"></d-chart>
                              </card-component>-->
                              <b-button class="is-info" @click="Activation(SallesData.chartData)" expanded>Salles par type</b-button>
                              <b-button class="is-info" @click="Activation(SallesData.chartData)" expanded>Salles par département</b-button>
                            </tiles>
                          </b-tab-item>
                        </b-tabs>
                      </b-tab-item>
                      <b-tab-item label="Outils">
                        <b-tabs position="is-centered" class="block">
                          <b-tab-item label="Résultats" icon="view-list">
                            <b style="font-size: 20px">Nombre de outils :</b><br>
                              {{ totalOut }}
                          </b-tab-item>
                          <b-tab-item label="Graphes" icon="chart-timeline-variant">
                            <b-button class="is-info" @click="Activation(SallesData.chartData)">Outils par type</b-button>
                          </b-tab-item>
                        </b-tabs>
                      </b-tab-item>
                    </b-tabs>
            </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import DChart from '@/components/Charts/DChart'
import CardComponent from '@/components/CardComponent.vue'
import ModalChartView from '@/components/ModalBox/ModalChartView.vue'
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'

/* eslint-disable */
export default {
  name: 'Audit',
  components: {
    HeroBar,
    TitleBar,
    Tiles,
    DChart,
    CardComponent,
    ModalChartView,
    VueApexCharts
  },
  data () {
    return {
      data: [14, 15],
      options: {
        chart: {
          id: ''
        },
        labels: ['hey', 'hey2']
      },
      salles: {
        salleFilter: {
          type: 'none',
          capacite: 'none'
        },
        dataset: [],
        data: []
      },
      ChartData: null,
      isModalChartViewActive: false,
      tauxEnc: {
        total: 0,
        specialite: {
          Math: 0,
          Info: 0,
          Elec: 0,
          Lang: 0
        }
      },
      radio: 'none',
      SallesData: {
        chartData: null
      },
      EtdSexData: {
        chartData: null
      },
      EnsSexData: {
        chartData: null
      },
      EnsSpeData: {
        chartData: null
      },
      EnsGrdData: {
        chartData: null
      },
      EnsSocData: {
        chartData: null
      },
      totalEtd: 0,
      totalPar: 0,
      totalEns: 0,
      totalDoc: 0,
      totalDep: 0,
      totalFrm: 0,
      totalAct: 0,
      totalClb: 0,
      totalSal: 0,
      totalOut: 0,
      totalAdm: 0,
      isOpen: 0
    }
  },
  computed: {
    titleStack () {
      return [
        'Statistiques',
        'Audit Social'
      ]
    }
  },
  mounted () {
    this.$store.state.isFooterBarVisible = true
    this.$store.state.isAsideVisible = true
    this.fillSallesData()
    this.fillEtdSexData()
    this.fillEnsData()
  },
  async created () {
    // etudiants count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'etudiants'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.$store.state.totalEtd = response.data.count
        this.totalEtd = this.$store.state.totalEtd
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
    // partenaires count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'partenaires'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalPar = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // enseignants count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'enseignants'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.$store.state.totalEns = response.data.count
        this.totalEns = this.$store.state.totalEns
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // doctorants count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'doctorants'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalDoc = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // departements count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'departements'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalDep = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // formations count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'formations'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalFrm = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // clubs count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'clubs'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalClb = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // activites count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'activites'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalAct = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // salles count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'salles'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalSal = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // outils count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'outils'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalOut = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
      // Administratifs count
    await axios.post('http://localhost:8080/api/stats/count', {
      table: 'administratifs'
    }, { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(response => {
        console.log(response.data.count)
        this.totalAdm = response.data.count
      })
      .catch(e => {
        this.errorMessage = e.message
        console.log('There was an error!', e)
        this.$buefy.snackbar.open({
          type: 'is-warning',
          message: 'Erreur fl count',
          queue: false
        })
      })
    this.tauxEnc.total = this.saha(this.$store.state.totalEns / this.$store.state.totalEtd)
    // get data
    await axios
      .get('http://localhost:8080/api/data/enseignants', { headers: { 'x-access-token': this.$session.get('jwt') } })
      .then(r => {
        this.isLoading = false
        if (r.data && r.data.results) {
          if (r.data.results.length > this.perPage) {
            this.paginated = true
          }
          this.Maths = r.data.results.filter(obj => obj.specialite === 'Mathematique')
          this.Info = r.data.results.filter(obj => obj.specialite === 'Informatique')
          this.Elec = r.data.results.filter(obj => obj.specialite === 'electronique')
          this.Langues = r.data.results.filter(obj => obj.specialite === 'Langues')
        }
      })
      .catch(e => {
        this.isLoading = false
        this.$buefy.toast.open({
          message: `Error: ${e.message}`,
          type: 'is-danger'
        })
      })
    this.tauxEnc.specialite.Math = this.saha(this.Maths.length / this.$store.state.totalEtd)
    this.tauxEnc.specialite.Info = this.saha(this.Info.length / this.$store.state.totalEtd)
    this.tauxEnc.specialite.Elec = this.saha(this.Elec.length / this.$store.state.totalEtd)
    this.tauxEnc.specialite.Lang = this.saha(this.Langues.length / this.$store.state.totalEtd)
  },
  methods: {
    cancel () {
      this.isModalChartViewActive = false
    },
    Activation (x) {
      this.ChartData = x
      this.options.labels = x.labels
      this.data = x.datasets[0].data
      this.isModalChartViewActive = true
      console.log(x)
    },
    UpdateSalleData () {
      this.salles.data = this.salles.dataset
      if (this.salles.salleFilter.capacite === 'none') {
        if (this.salles.salleFilter.type !== 'none') {
          console.log('filter with type')
          this.salles.data = this.salles.data.filter(obj => obj.type === this.salles.salleFilter.type)
        } else {
          this.salles.data = this.salles.dataset
        }
      } else {
        console.log('filter with capacite')
        if (this.salles.salleFilter.type !== 'none') {
          console.log('filter with type')
          this.salles.data = this.salles.data.filter(obj => obj.type === this.salles.salleFilter.type)
          switch (this.salles.salleFilter.capacite) {
            case 'Bas':
              this.salles.data = this.salles.data.filter(obj => obj.capacite < 50)
              break
            case 'Moyen':
              this.salles.data = this.salles.data.filter(obj => ((obj.capacite >= 50) && (obj.capacite < 100)))
              break
            case 'Haut':
              this.salles.data = this.salles.data.filter(obj => obj.capacite >= 100)
              break
          }
        } else {
          switch (this.salles.salleFilter.capacite) {
            case 'none':
              this.salles.data = this.salles.dataset
              break
            case 'Bas':
              this.salles.data = this.salles.data.filter(obj => obj.capacite < 50)
              break
            case 'Moyen':
              this.salles.data = this.salles.data.filter(obj => ((obj.capacite >= 50) && (obj.capacite < 100)))
              break
            case 'Haut':
              this.salles.data = this.salles.data.filter(obj => obj.capacite >= 100)
              break
          }
        }
      }
    },
    fillSallesData () {
      axios
        .get('http://localhost:8080/api/data/salles', { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.results) {
            if (r.data.results.length > this.perPage) {
              this.paginated = true
            }
            // this.$store.state.salles = r.data.results
            this.salles.data = this.salles.dataset = r.data.results
            this.sallesAmphi = r.data.results.filter(obj => obj.type === 'Amphi')
            this.sallesTD = r.data.results.filter(obj => obj.type === 'Salle TD')
            this.sallesTP = r.data.results.filter(obj => obj.type === 'Salle TP')
            this.sallesBureau = r.data.results.filter(obj => obj.type === 'bureau')
            this.sallesAutres = r.data.results.filter(obj => obj.type === 'autres')
            this.SallesData.chartData = {
              labels: ['Autres', 'Salle TD', 'Salle TP', 'Amphi', 'Bureau'],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: ['#a3c7c9', '#889d9e', '#647678', '#509d9e', '#109d9e'],
                  data: [this.sallesAutres.length, this.sallesTD.length, this.sallesTP.length, this.sallesAmphi.length, this.sallesBureau.length]
                }
              ]
            }
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    fillEtdSexData () {
      axios
        .get('http://localhost:8080/api/data/etudiants', { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.results) {
            if (r.data.results.length > this.perPage) {
              this.paginated = true
            }
            // this.$store.state.etudiants = r.data.results
            this.Homme = r.data.results.filter(obj => obj.Sex === 'Homme')
            this.Femme = r.data.results.filter(obj => obj.Sex === 'Femme')
            this.EtdSexData.chartData = {
              labels: ['Homme', 'Femme'],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: ['#0078D7', '#EA005E'],
                  data: [this.Homme.length, this.Femme.length]
                }
              ]
            }
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    fillEnsData () {
      axios
        .get('http://localhost:8080/api/data/enseignants', { headers: { 'x-access-token': this.$session.get('jwt') } })
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.results) {
            if (r.data.results.length > this.perPage) {
              this.paginated = true
            }
            // Enseignants par sex
            // this.$store.state.enseignants = r.data.results
            this.Homme = r.data.results.filter(obj => obj.Sex === 'Homme')
            this.Femme = r.data.results.filter(obj => obj.Sex === 'Femme')
            this.EnsSexData.chartData = {
              labels: ['Homme', 'Femme'],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: ['#0078D7', '#EA005E'],
                  data: [this.Homme.length, this.Femme.length]
                }
              ]
            }
            // Enseignants par specialité
            this.Maths = r.data.results.filter(obj => obj.specialite === 'Mathematique')
            this.Info = r.data.results.filter(obj => obj.specialite === 'Informatique')
            this.Elec = r.data.results.filter(obj => obj.specialite === 'electronique')
            this.Langues = r.data.results.filter(obj => obj.specialite === 'Langues')
            this.EnsSpeData.chartData = {
              labels: ['Math', 'Informatique', 'Electronique', 'Langues'],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: ['#0078D7', '#E74856', '#8E8CD8', '#00B7C3'],
                  data: [this.Maths.length, this.Info.length, this.Elec.length, this.Langues.length]
                }
              ]
            }
            // Enseignants par grade
            this.MCA = r.data.results.filter(obj => obj.grade === 'MCA')
            this.MCB = r.data.results.filter(obj => obj.grade === 'MCB')
            this.MAA = r.data.results.filter(obj => obj.grade === 'MAA')
            this.MAB = r.data.results.filter(obj => obj.grade === 'MAB')
            this.EnsGrdData.chartData = {
              labels: ['MCA', 'MCB', 'MAA', 'MAB'],
              datasets: [
                {
                  label: 'Grades',
                  backgroundColor: ['#0078D7', '#E74856', '#8E8CD8', '#00B7C3'],
                  data: [this.MCA.length, this.MCB.length, this.MAA.length, this.MAB.length]
                }
              ]
            }
            // Enseignants par situation social
            this.Celib = r.data.results.filter(obj => obj.situationSocial === 'Célibataire')
            this.Marie = r.data.results.filter(obj => obj.situationSocial === 'Marié')
            this.Veuf = r.data.results.filter(obj => obj.situationSocial === 'Veuf')
            this.Divorce = r.data.results.filter(obj => obj.situationSocial === 'Divorcé')
            this.EnsSocData.chartData = {
              labels: ['Célibataire', 'Marié', 'Veuf', 'Divorcé'],
              datasets: [
                {
                  label: 'Grades',
                  backgroundColor: ['#0078D7', '#E74856', '#8E8CD8', '#00B7C3'],
                  data: [this.Celib.length, this.Marie.length, this.Veuf.length, this.Divorce.length]
                }
              ]
            }
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    simplify (str) {
      var result = ''
      var data = str.split('/')
      var numOne = Number(data[0])
      var numTwo = Number(data[1])
      console.log('splited : ' + numOne)
      for (var i = Math.max(numOne, numTwo); i > 1; i--) {
        if ((numOne % i === 0) && (numTwo % i === 0)) {
          numOne /= i
          numTwo /= i
        }
      }
      if (numTwo === 1) {
        result = numOne.toString()
      } else {
        result = numOne.toString() + '/' + numTwo.toString()
      }
      return result
    },
    saha (x) {
      var init = Math.abs(1 - x)
      var a = 0
      var i = 1
      var stop = false
      var res = 1
      var b
      do {
        a = 1 / i
        b = Math.abs(a - x)
        console.log('b :' + b)
        console.log('init :' + init)
        if (init >= b) {
          res = i
          init = b
        } else {
          stop = true
        }
        i++
      }
      while (stop === false)
      return res
    }
  }
}
</script>
