import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import vuetify from './plugins/vuetify';

import Accueil from './components/Accueil.vue';
import RestaurantsList from './components/RestaurantsList.vue';
import Restaurant from './components/Restaurant.vue';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Accueil,
    },
    {
      path: '/restaurants',
      component: RestaurantsList,
    },
    {
      path: '/restaurants/:id',
      component: Restaurant,
    },
  ],
  mode: 'history',
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
