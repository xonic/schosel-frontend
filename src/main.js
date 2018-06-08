import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import analytics from 'vue-analytics'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
