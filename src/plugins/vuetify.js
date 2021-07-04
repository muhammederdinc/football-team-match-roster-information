import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        fadedRed: '#E63846',
        aquaGreen: '#12C990',
        nightBlue: '#02063F',
        lightRoyalBlue: '#3852FF',
      },
    },
  },
});
