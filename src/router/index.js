import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../modules/home';
import GeneratedSquad from '../modules/generatedSquad';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/generatedSquad',
    name: 'GeneratedSquad',
    component: GeneratedSquad,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
