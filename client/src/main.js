import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Accueil from './components/Accueil.vue';
import RestaurantsList from './components/RestaurantsList.vue';
import Restaurant from './components/Restaurant.vue';
import vuetify from './plugins/vuetify'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter)

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
