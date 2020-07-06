import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { VueEditor } from 'vue2-editor'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'


import firebase from 'firebase/app'

Vue.use(Vuelidate)

firebase.initializeApp({
  apiKey: "AIzaSyCViZZF2svGuK2QQZr73wXhTi3NvuRvfBY",
  authDomain: "wiki-itl.firebaseapp.com",
  databaseURL: "https://wiki-itl.firebaseio.com",
  projectId: "wiki-itl",
  storageBucket: "wiki-itl.appspot.com",
  messagingSenderId: "605593651820",
  appId: "1:605593651820:web:044a9db9921d237dc02649",
  measurementId: "G-GYMS3S0J7L"
});


Vue.config.productionTip = false
let app
firebase.auth().onAuthStateChanged (()=> {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

