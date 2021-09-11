<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Historique
    </hero-bar>
    <section class="section is-main-section">
        <history-table data-url=""></history-table>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import HistoryTable from '@/components/Tables/HistoryTable.vue'
import VueSocketIO from 'vue-socket.io'

/* eslint-disable */
export default {
  name: 'History',
  components: {
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar,
    HistoryTable,
    VueSocketIO
  },
  data () {
    return {
    }
  },
  /* sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log("server connected");
    },

    disconnect() {
      this.isConnected = false;
      console.log("server disconnected");
    },

    // Fired when the server sends something on the "messageChannel" channel.
    log(data) {
      this.socketMessage = data
      console.log('data1' + data);
    },
    logs (data) {
      this.socketMessage = data
      console.log('datalog =' + String.fromCharCode.apply(null, new Uint8Array(data)))
      // this.$store.state.logsdata.push()
    },
    auths (data) {
      const a = String.fromCharCode.apply(null, new Uint8Array(data))
      console.log('dataAuth =' + a)
    }
  }, */
  /* sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  }, */
  computed: {
    titleStack () {
      return [
        'Admin',
        'Historique'
      ]
    }
  },
  /* mounted () {

    this.sockets.subscribe('logs' , (data) => {
      var fromBuffer= String.fromCharCode.apply(null, new Uint8Array(data))
      this.msg = fromBuffer
      console.log('message from socket: ' + this.msg)
      // this.$store.state.logsdata.add(this.msg)
      // console.log(this.$socket)
    })
    this.sockets.subscribe('auths' , (data) => {
      var fromBuffer= String.fromCharCode.apply(null, new Uint8Array(data))
      this.msg = fromBuffer
      console.log('auths from socket: ' + this.msg)
      // this.$store.state.logsdata.add(this.msg)
      // console.log(this.$socket)
    })
  }, */
  methods: {
  }
}
</script>
