import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* LoginState */
    isLog: false,

    /* counts */
    totalEtd: 0,
    totalEns: 0,

    /* departements json */
    deps: [],

    /* salles */
    salles: [],
    salleTD: 0,
    salleTP: 0,
    salleAmphi: 0,
    salleBureau: 0,
    salleAutres: 0,
    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false,

    /* QueryCreator */
    list: [],
    list2: [],
    dims: [],
    atts: [],
    attsDetail: [],
    isRollUp: false,
    RollUp: [],
    isCube: false,
    Cube: [],
    isGroupBy: false,
    GroupBy: [],
    isOrderBy: false,
    OrderBy: [],
    attDim: [],
    checked: [],

    /* ChartCreator */
    variables: [],
    data: [],
    Xes: [],
    result: [],

    /* kafka data */
    logsdata: []
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },
    // log
    log (state, payload) {
      state.isLog = payload
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },

    /* Aside Mobile */
    asideMobileStateToggle (state, payload = null) {
      const htmlClassName = 'has-aside-mobile-expanded'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideMobileExpanded = isShow
    }
  },
  actions: {

  }
})
