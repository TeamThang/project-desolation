
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    user: null,
    level: null
  },
  mutations: {
    setUserName (state, name) {
      console.log('123', state.user, name)
      state.user = name
    },
    setUserLevel (state, level) {
      console.log('setUserLevel', state.level, level)
      state.level = level
    }
  },
  strict: debug
})