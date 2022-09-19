import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import main from './main'
import echart from './echart'
const store = new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    main,
    echart
  }
})

export default store

