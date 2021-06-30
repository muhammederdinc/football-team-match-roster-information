import Vue from 'vue';
import Vuex from 'vuex';
import home from '../modules/home/store';

Vue.use(Vuex);

export const storeOptions = {
  modules: {
    home,
  },
};

export default new Vuex.Store(storeOptions);
