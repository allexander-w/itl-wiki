import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/modules/auth'
import other from '../store/modules/other'
import account from '../store/modules/account'
import comment from '../store/modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,other,account,comment
  }
})
