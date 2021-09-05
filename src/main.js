/* Styles */
import '@/scss/main.scss'

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* kafka */
// import '@/Kafka/consumer.js'

/* VueSocketIO */
// import VueSocketIO from 'vue-socket.io'
import '@/Kafka/socket.js'
/* Sessions */
import VueSession from 'vue-session'

/* Router & Store */
import router from './router'
import store from './store'

/* Service Worker */
import './registerServiceWorker'

/* Vue. Main component */
import App from './App.vue'

/* moment.js */
import { moment } from 'moment'

/* vue-json-to-csv */
import VueJsonToCsv from 'vue-json-to-csv'

/* Vue Apex Chart */
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

/* kafkajs */

/* moment.js */
// var moment = require('moment')
Vue.prototype.moment = moment

/* vue-json-to-csv */
Vue.use(VueJsonToCsv)

/* Default title tag */
const defaultDocumentTitle = 'Audit Dash'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
  store.commit('asideMobileStateToggle', false)

  if (to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

Vue.config.productionTip = false
Vue.use(VueSession)
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
