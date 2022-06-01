import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.component('apexchart',VueApexCharts)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
/*const searchBar =document.querySelector("#searchBar");
searchBar.addEventListener("keyup",(e)) => {
  const searchedLetters=e.target.value;
  const cards=document.querySelectorAll(".cards");
  filterElements(searchedLetters, cards);
}*/