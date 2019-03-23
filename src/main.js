import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL='http://localhost';


const store = new Vuex.Store({
  state: {
    replyTodoDialog: false,
    replyListDialog: false,
    todoId: NaN,
    teamId: NaN,
  },
  mutations: {  
    showReplyDialog (state, hw) {
      state.replyTodoDialog = true;
      state.todoId = hw.id;
      state.teamId = hw.team_id;
    },
    closeReplyDialog (state) {
      state.replyTodoDialog = false;
    },
    showReplyListDialog (state, hw) {
      state.replyListDialog = true;
      state.todoId = hw.id;
      state.teamId = hw.team_id;
    },
    closeReplyListDialog (state) {
      state.replyListDialog = false;
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
