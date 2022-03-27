import Vue from 'vue'
import  Vuelidate  from 'vuelidate'
import vuetify from './plugins/vuetify'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

Vue.use(Vuelidate)
Vue.config.productionTip = false



new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
