import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardAdmUser from '../views/DashboardAdm_User.vue'
import DashboardResAdmUser from '../views/DashboardRes_Adm_User.vue'
import DashboardResUser from '../views/DashboardRes_User.vue'
import DashboardUser from '../views/DashboardUser.vue'
import DashboardChefUser from '../views/DashboardChef_User.vue'
import Profile from '../views/Profile.vue'      
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
import CompleterSignalement from '../views/CompleterSignalement.vue'
import Res_modifier_signalement from '../views/Res_modifier_signalement.vue'
import SignalementsEnAttente from '../views/SignalementsEnAttente.vue'
import TraitementSignalements from '../views/TraitementSignalements.vue'
import SignalementsACompleter from '../views/SignalementsACompleter.vue'
import SignalementsSuspendus from '../views/SignalementsSuspendus.vue'
import SignalementsRefusés from '../views/SignalementsRefusés.vue'


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
    path: '/DashboardAdmUser',
    name: 'DashboardAdmUser',
    component: DashboardAdmUser,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/DashboardResUser',
    name: 'DashboardResUser',
    component: DashboardResUser,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/DashboardChefUser',
    name: 'DashboardChefUSer',
    component: DashboardChefUser,
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
    path: '/DashboardResAdmUser',
    name: 'DashboardResAdmUser',
    component: DashboardResAdmUser,
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
    path: '/CompleterSignalement',
    name: 'CompleterSignalement',
    component: CompleterSignalement,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SignalementsEnAttente',
    name: 'SignalementsEnAttente',
    component: SignalementsEnAttente,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/TraitementSignalements',
    name: 'TraitementSignalements',
    component: TraitementSignalements,
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
  {
    path: '/SignalementsACompleter',
    name: 'SignalementsACompleter',
    component: SignalementsACompleter,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SignalementsSuspendus',
    name: 'SignalementsSuspendus',
    component: SignalementsSuspendus,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SignalementsRefusés',
    name: 'SignalementsRefusés',
    component: SignalementsRefusés,
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
