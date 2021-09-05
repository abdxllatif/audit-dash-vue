import Vue from 'vue'
// import store from '../store'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'localhost:8090',
  transports: ['websocket', 'polling', 'flashsocket']
}))
