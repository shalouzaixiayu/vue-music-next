import { createStore, createLogger } from 'vuex'
import state from './state.js'
import getters from './getter.js'
import mutations from './mutations.js'
import actions from './actions.js'
const debug = process.env.NODE_ENV !== "production";

export default createStore({
  state,
  getters,
  mutations,
  actions,
  plugins: debug ? [createLogger()] : []
})
