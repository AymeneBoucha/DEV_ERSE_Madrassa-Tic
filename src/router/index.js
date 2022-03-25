import Vue from 'vue'
import VueRouter from 'vue-router'
import connexion from '../views/connexion.vue'
import accueil from '../views/accueil.vue'
import mdp_oublie from '../views/mdp_oublie.vue'
import reset from '../views/reset.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: connexion
  },
  {
    path: '/accueil',
    name: 'accueil',
    component: accueil
  },
  {
    path: '/mdp_oublie',
    name: 'mdp_oublie',
    component: mdp_oublie
  },
  {
    path: '/reset/:token',
    name: 'reset',
    component: reset
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router