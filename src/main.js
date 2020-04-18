import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Main from './pages/Main.vue'
import About from './pages/About.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Main },
  { path: '/about', component: About }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
