import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import subMenuList from './modules/subMenuList'
import orderDeatil from './modules/orderDeatil'
import getters from './getters'
// import actions from './actions'
// vuex 持久化
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    subMenuList,
    orderDeatil
  },
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的 subMenuList orderDeatil
        subMenuList: val.subMenuList,
        orderDeatil: val.orderDeatil
      }
    }
  })]
  // actions
})

export default store
