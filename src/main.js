import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import main from './assets/styles/main.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  main,
  render: (h) => h(App),
}).$mount('#app');
