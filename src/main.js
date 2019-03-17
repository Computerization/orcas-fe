import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL='http://localhost';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
