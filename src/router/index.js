import Vue from 'vue'
import VueRouter from 'vue-router'
import Dash from '../views/Dash.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import page404 from '../views/404.vue'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    meta: {
      title: 'Erreur 404'
    },
    path: '/404',
    name: '404',
    component: page404
  },
  {
    meta: {
      title: 'dash'
    },
    path: '/dash',
    name: 'dash',
    component: Dash
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'home'
    },
    path: '/',
    name: 'home',
    component: Home
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next({ name: 'dash' }) } else { next() }
    } */
  },
  {
    meta: {
      title: 'A propos'
    },
    path: '/about',
    name: 'about',
    component: About
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: Login
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next({ name: 'dash' }) } else { next() }
    } */
  },
  {
    meta: {
      title: 'Signup'
    },
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Signup.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next({ name: 'dash' }) } else { next() }
    } */
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tables.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Forms.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'New client'
    },
    path: '/client/new',
    name: 'client.new',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Edit client'
    },
    path: '/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Edit department'
    },
    path: '/department/:id',
    name: 'dep.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Departement/Edit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau Departement'
    },
    path: '/insertion/departement',
    name: 'newDep',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewDep.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouvelle formation'
    },
    path: '/insertion/formation',
    name: 'newForm',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewForm.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau partenaire'
    },
    path: '/insertion/partenaire',
    name: 'newPar',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewPar.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau administratif'
    },
    path: '/insertion/administratif',
    name: 'newAdm',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewAdministratif.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau étudiant'
    },
    path: '/insertion/etudiant',
    name: 'newEtu',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewEtu.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau outil'
    },
    path: '/insertion/outil',
    name: 'newOutil',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewOutil.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouvelle salle'
    },
    path: '/insertion/salle',
    name: 'newSalle',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewSalle.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau club'
    },
    path: '/insertion/club',
    name: 'newClub',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewClub.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouvelle activité'
    },
    path: '/insertion/activite',
    name: 'newActivite',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewActivite.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Départements'
    },
    path: '/tables/departement',
    name: 'dep',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Dep.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Formations'
    },
    path: '/tables/formation',
    name: 'form',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Form.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Partenaires'
    },
    path: '/tables/partenaire',
    name: 'par',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Par.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Etudiants'
    },
    path: '/tables/etudiants',
    name: 'etudiants',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Etudiant.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Salles'
    },
    path: '/tables/salles',
    name: 'salle',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Salle.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Outils'
    },
    path: '/tables/outils',
    name: 'outil',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Outil.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Enseignants'
    },
    path: '/tables/enseignants',
    name: 'enseignant',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Enseignant.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Doctorants'
    },
    path: '/tables/doctorants',
    name: 'doctorant',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Doctorant.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Clubs scientifiques et culturels'
    },
    path: '/tables/clubs',
    name: 'club',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Club.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Activités'
    },
    path: '/tables/activites',
    name: 'activite',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Activite.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Administratifs'
    },
    path: '/tables/administratifs',
    name: 'administratif',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Administratif.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  // Statistiques
  {
    meta: {
      title: 'Statistiques générales'
    },
    path: '/stats',
    name: 'GeneralStat',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Stat/General.vue')
    /* beforeEnter (to, from, next) {
      console.log(store.state.isLog)
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Charts'
    },
    path: '/charts',
    name: 'charts',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Stat/Charts.vue')
  },
  {
    meta: {
      title: 'Audit Social'
    },
    path: '/audit',
    name: 'Audit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Stat/Audit.vue')
  },
  // Détails
  {
    meta: {
      title: 'Détails de la formation'
    },
    path: '/formation/:id',
    name: 'FormationDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/FormationDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du niveau'
    },
    path: '/niveau/:id',
    name: 'NiveauDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/NiveauDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du département'
    },
    path: '/departement/:id',
    name: 'DepartementDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/DepartementDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du partenaire'
    },
    path: '/partenaire/:id',
    name: 'PartenaireDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/PartenaireDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails de la salle'
    },
    path: '/salle/:id',
    name: 'SalleDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/SalleDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du club'
    },
    path: '/club/:id',
    name: 'ClubDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/ClubDetail.vue'),
    props: true
  },
  /* Query */
  {
    meta: {
      title: "Création d'une requete"
    },
    path: '/query',
    name: 'QueryCreator',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/query/Query.vue'),
    props: true
  },
  {
    meta: {
      title: 'Résultats'
    },
    path: '/query/results',
    name: 'QueryResult',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/query/Result.vue'),
    props: true
  },
  {
    meta: {
      title: 'Graphe des résultats'
    },
    path: '/query/results/chart',
    name: 'ChartResult',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/query/ChartResult.vue'),
    props: true
  },
  {
    meta: {
      title: 'Résultats sauvegardées'
    },
    path: '/results',
    name: 'SavedQuery',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/query/SavedQuery.vue'),
    props: true
  },
  {
    path: '*', redirect: '/404'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
// GOOD
/* router.beforeEach((to, from, next) => {
  if (!this.$session.exists()) next({ name: 'login' })
  else next()
}) */
export default router
