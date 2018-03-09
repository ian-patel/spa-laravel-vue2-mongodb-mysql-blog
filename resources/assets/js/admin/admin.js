import Vue from 'vue';
import store from './store';
import router from './router';

import 'app/bootstrap';
import './components/register';

Vue.config.productionTip = false

// Create Vue instance and attach to the page
const app = new Vue({
  store,
  router,
});

app.$mount('#app');