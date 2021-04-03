import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import analytics from 'vue-analytics'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

Vue.use(analytics, {
  id: 'UA-83223879-1',
  router,
  debug: {
    enabled: false,
    trace: false,
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
