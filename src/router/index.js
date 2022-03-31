import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Signalements.vue'
import Comptes from '../views/Comptes.vue'

Vue.use(VueRouter)


const routes = [
 /*{
    path: '/dashboard',
    name: 'Madrassa-Tic'
    },*/
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/signalements',
    name: 'signalements',
    component: Projects
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/comptes',
    name: 'comptes',
    component: Comptes
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router
