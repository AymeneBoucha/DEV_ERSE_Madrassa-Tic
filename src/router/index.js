import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardResAdmUser from '../views/DashboardRes_Adm_User.vue'
import DashboardResUser from '../views/DashboardRes_User.vue'
import DashboardChefUser from '../views/DashboardChef_User.vue'
import DashboardAnnUser from '../views/DashboardAnnUser.vue'
import Profile from '../views/Profile.vue'      
import Comptes from '../views/Comptes.vue'
import ComptesChefdeService from '../views/ComptesChefdeService.vue'
import ComptesRes from '../views/ComptesRes.vue'
import ComptesAnn from '../views/ComptesAnn.vue'
import ComptesAdm from '../views/ComptesAdm'
import Modifier_Profile from '../views/Modifier_Profile.vue'
import Sign_up_in from '../views/Sign_up_in.vue'
import Forgot_password from '../views/Forgot_password.vue'
import Reset_password from '../views/Reset_password.vue'
import MesSignalements from '../views/MesSignalements.vue'
import LesSignalements from '../views/LesSignalements.vue'
import addSignal from '../views/add-signalement.vue'
import SigEnAttent from '../views/SigEnAttent.vue'
import SigTraite from '../views/SigTraite.vue'
import SigSuspendu from '../views/SigSuspendu.vue'
import SigEnTraitement from '../views/SigEnTraitement.vue'
import SignalementsEnregistres from '../views/SignalementsEnregistres.vue'
import CompleterSignalement from '../views/CompleterSignalement.vue'
import Res_modifier_signalement from '../views/Res_modifier_signalement.vue'
import SignalementsEnAttente from '../views/SignalementsEnAttente.vue'
import SignalementsACompleter from '../views/SignalementsACompleter.vue'
import SignalementsACompleterRes from '../views/SignalementsACompleterRes.vue'
import SignalementsSuspendus from '../views/SignalementsSuspendus.vue'
import SignalementsEnTraitement from '../views/SignalementsEnTraitement.vue'
import GestionCategories from '@/views/GestionCategories.vue'
import LesRapportsRes from '../views/LesRapportsRes.vue'
import RapportsValRes from '../views/RapportsValRes.vue'
import RapportsACompRes from '../views/RapportsACompRes.vue'
import RapportsEnvoyesChef from '../views/RapportsEnvoyesChef.vue'
import RapportsValidesChef from '../views/RapportsValidesChef.vue'
import RapportsAcompleterChef from '../views/RapportsAcompleterChef.vue'
import Statistiques from '../views/Statistiques.vue'
import AnnonceValideRes from '../views/AnnonceValideRes.vue'
import AnnonceAfficheRes from '../views/AnnonceAfficheRes.vue'
import AnnonceAnnuleRes from '../views/AnnonceAnnuleRes.vue'
import AnnonceAnnuleAnnoncer from '../views/AnnonceAnnuleAnnoncer.vue'
import MesAnnoncesAnnouncer from '../views/MesAnnoncesAnnouncer.vue'
import AjouterAnnonce from '../views/AjouterAnnonce.vue'
import AnnonceRejeteAnnoncer from '../views/AnnonceRejeteAnnoncer.vue'
import DashboardAnnoncerUser from '../views/DashboardAnnoncer_User.vue'
import DashboardAnnoncerRes from '../views/DashboardAnnoncer_Res.vue'
import AnnonceExpireRes from '../views/AnnonceExpireRes.vue'
import AnnonceExpireAnnoncer from '../views/AnnonceExpireAnnoncer.vue'
import Accueil from '../views/Accueil.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sign_up_in',
    component: Sign_up_in,
  },
  {
    path: '/Accueil',
    name: 'Accueil',
    component: Accueil,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/Statistiques',
    name: 'Statistiques',
    component: Statistiques,
    meta: {
      hideNavbar: true,
     }
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
    path: '/DashboardAnnUser',
    name: 'DashboardAnnUser',
    component: DashboardAnnUser,
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
    path: '/ComptesChefdeService',   //PROFILE
    name: 'ComptesChefdeService',
    component: ComptesChefdeService,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/ComptesRes',   //PROFILE
    name: 'ComptesRes',
    component: ComptesRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/ComptesAnn',   //PROFILE
    name: 'ComptesAnn',
    component: ComptesAnn,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/ComptesAdm',   //PROFILE
    name: 'ComptesAdm',
    component: ComptesAdm,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/ComptesChefdeService',   //PROFILE
    name: 'ComptesChefdeService',
    component: ComptesChefdeService,
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
    path: '/SignalementsEnTraitement',
    name: 'SignalementsEnTraitement',
    component: SignalementsEnTraitement,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/SigTraite',
    name: 'SigTraite',
    component: SigTraite,
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
    path: '/SignalementsACompleterRes',
    name: 'SignalementsACompleterRes',
    component: SignalementsACompleterRes,
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
    path: '/SignalementsEnTraitement',
    name: 'SignalementsEnTraitement',
    component: SignalementsEnTraitement,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/GestionCategories',
    name: 'GestionCategories',
    component: GestionCategories,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/LesRapportsRes',
    name: 'LesRapportsRes',
    component: LesRapportsRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/RapportsValRes',
    name: 'RapportsValRes',
    component: RapportsValRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/RapportsACompRes',
    name: 'RapportsACompRes',
    component: RapportsACompRes,
    meta: {
      hideNavbar: true,
     }
  },

  {
    path: '/RapportsEnvoyesChef',
    name: 'RapportsEnvoyesChef',
    component: RapportsEnvoyesChef,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/RapportsValidesChef',
    name: 'RapportsValidesChef',
    component: RapportsValidesChef,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/RapportsAcompleterChef',
    name: 'RapportsAcompleterChef',
    component: RapportsAcompleterChef,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/AnnonceValideRes',
    name: 'AnnonceValideRes',
    component: AnnonceValideRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/AnnonceAfficheRes',
    name: 'AnnonceAfficheRes',
    component: AnnonceAfficheRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/AnnonceAnnuleRes',
    name: 'AnnonceAnnuleRes',
    component: AnnonceAnnuleRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/AnnonceAnnuleAnnoncer',
    name: 'AnnonceAnnuleAnnoncer',
    component: AnnonceAnnuleAnnoncer,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/MesAnnoncesAnnouncer',
    name: 'MesAnnoncesAnnouncer',
    component: MesAnnoncesAnnouncer,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/AjouterAnnonce',
    name: 'AjouterAnnonce',
    component: AjouterAnnonce,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/AnnonceRejeteAnnoncer',
    name: 'AnnonceRejeteAnnoncer',
    component: AnnonceRejeteAnnoncer,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/DashboardAnnoncerUser',
    name: 'DashboardAnnoncerUser',
    component: DashboardAnnoncerUser,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/DashboardAnnoncerRes',
    name: 'DashboardAnnoncerRes',
    component: DashboardAnnoncerRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/AnnonceExpireRes',
    name: 'AnnonceExpireRes',
    component: AnnonceExpireRes,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/AnnonceExpireAnnoncer',
    name: 'AnnonceExpireAnnoncer',
    component: AnnonceExpireAnnoncer,
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