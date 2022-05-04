import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import DashboardRes from '../views/DashboardRes.vue'
import DashboardUser from '../views/DashboardUser.vue'
import DashboardChef from '../views/DashboardChef.vue'
import Profile from '../views/Profile.vue'      //profile
import Comptes from '../views/Comptes.vue'
import Modifier_Profile from '../views/Modifier_Profile.vue'
import Sign_up_in from '../views/Sign_up_in.vue'
import Forgot_password from '../views/Forgot_password.vue'
import Reset_password from '../views/Reset_password.vue'
import MesSignalements from '../views/MesSignalements.vue'
import LesSignalements from '../views/LesSignalements.vue'
import addSignal from '../views/add-signalement.vue'
import SigEnAttent from '../views/SigEnAttent.vue'
import SigTraité from '../views/SigTraité.vue'
import SigRefusé from '../views/SigRefusé.vue'
import SigSuspendu from '../views/SigSuspendu.vue'
import SigEnTraitement from '../views/SigEnTraitement.vue'
import SignalDash from '../views/SignalDash.vue'
import SignalDashRes from '../views/SignalDashRes.vue'
import SignalementsEnregistres from '../views/SignalementsEnregistrés.vue'
import Res_modifier_signalement from '../views/Res_modifier_signalement'
import Res_sig_att from '../views/Res_sig_att'
import Res_sig_val from '../views/Res_sig_val'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sign_up_in',
    component: Sign_up_in,
  },
  {
    path: '/Forgot_password',
    name: 'Forgot_password',
    component: Forgot_password,
  },
  {
    path: '/Reset_password/:token',
    name: 'Reset_password',
    component: Reset_password,
  },
  {
    path: '/DashboardUser',
    name: 'Dashboard User',
    component: DashboardUser,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/DashboardChef',
    name: 'DashboardChef',
    component: DashboardChef,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/Profile',   //PROFILE
    name: 'profileitem',
    component: Profile,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/DashboardRes',
    name: 'dashboard Responsable',
    component: DashboardRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/Comptes',   //PROFILE
    name: 'ComptesItem',
    component: Comptes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/Modifier_Profile',
    name: 'Modifier_Profile',
    component: Modifier_Profile,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/MesSignalements',
    name: 'MesSignalements',
    component: MesSignalements,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/LesSignalements',
    name: 'LesSignalements',
    component: LesSignalements,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SigEnAttent',
    name: 'SigEnAttent',
    component: SigEnAttent,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/addSignal',
    name: 'addSignal',
    component: addSignal,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SigEnTraitement',
    name: 'SigEnTraitement',
    component: SigEnTraitement,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SigTraité',
    name: 'SigTraité',
    component: SigTraité,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SigRefusé',
    name: 'SigRefusé',
    component: SigRefusé,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SigSuspendu',
    name: 'SigSuspendu',
    component: SigSuspendu,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SignalDash',
    name: 'SignalDash',
    component: SignalDash,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SignalDashRes',
    name: 'SignalDashRes',
    component: SignalDashRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SignalementsEnregistres',
    name: 'SignalementsEnregistres',
    component: SignalementsEnregistres,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/Res_sig_att',
    name: 'Res_sig_att',
    component: Res_sig_att,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/Res_sig_val',
    name: 'Res_sig_val',
    component: Res_sig_val,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/Res_modifier_signalement',
    name: 'Res_modifier_signalement',
    component: Res_modifier_signalement,
    meta: {
      hideNavbar: true,
     }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
