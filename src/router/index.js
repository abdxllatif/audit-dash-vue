import Vue from 'vue'
import VueRouter from 'vue-router'
import Dash from '../views/Dash.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import page404 from '../views/404.vue'
import store from '../store'

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
      title: 'dash',
      requiresLogin: true
    },
    path: '/dash',
    name: 'dash',
    component: Dash
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
      title: 'Tables',
      requiresLogin: true
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
      title: 'Forms',
      requiresLogin: true
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
      title: 'Profile',
      requiresLogin: true
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
      title: 'New client',
      requiresLogin: true
    },
    path: '/client/new',
    name: 'client.new',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  /* edit */
  {
    meta: {
      title: 'Edit client',
      requiresLogin: true
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
      title: 'Modifier département',
      requiresLogin: true
    },
    path: '/department/:id/edit',
    name: 'dep.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Departement/Edit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier formation',
      requiresLogin: true
    },
    path: '/formation/:id/edit',
    name: 'formationEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/formationEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier partenaire',
      requiresLogin: true
    },
    path: '/partenaire/:id/edit',
    name: 'partenaireEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/partenaireEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier club',
      requiresLogin: true
    },
    path: '/club/:id/edit',
    name: 'clubEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/clubEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier activité',
      requiresLogin: true
    },
    path: '/activite/:id/edit',
    name: 'activiteEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/activiteEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier salle',
      requiresLogin: true
    },
    path: '/salle/:id/edit',
    name: 'salleEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/salleEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier outil',
      requiresLogin: true
    },
    path: '/outil/:id/edit',
    name: 'outilEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/outilEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier administratif',
      requiresLogin: true
    },
    path: '/administratif/:id/edit',
    name: 'administratifEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/administratifEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier étudiant',
      requiresLogin: true
    },
    path: '/etudiant/:id/edit',
    name: 'etudiantEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/etudiantEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier enseignant',
      requiresLogin: true
    },
    path: '/enseignant/:id/edit',
    name: 'enseignantEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/enseignantEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Modifier doctorant',
      requiresLogin: true
    },
    path: '/doctorant/:id/edit',
    name: 'doctorantEdit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/edit/doctorantEdit.vue'),
    props: true
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau Departement',
      requiresLogin: true
    },
    path: '/departement/new',
    name: 'newDep',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewDep.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouvelle formation',
      requiresLogin: true
    },
    path: '/formation/new',
    name: 'newForm',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewForm.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau partenaire',
      requiresLogin: true
    },
    path: '/partenaire/new',
    name: 'newPar',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewPar.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau administratif',
      requiresLogin: true
    },
    path: '/administratif/new',
    name: 'newAdm',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewAdministratif.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau étudiant',
      requiresLogin: true
    },
    path: '/etudiant/new',
    name: 'newEtu',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewEtu.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau enseignant',
      requiresLogin: true
    },
    path: '/enseignant/new',
    name: 'newEns',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewEnseignant.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau doctorant',
      requiresLogin: true
    },
    path: '/doctorant/new',
    name: 'newDoc',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewDoctorant.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau outil',
      requiresLogin: true
    },
    path: '/outil/new',
    name: 'newOutil',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewOutil.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouvelle salle',
      requiresLogin: true
    },
    path: '/salle/new',
    name: 'newSalle',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewSalle.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouveau club',
      requiresLogin: true
    },
    path: '/club/new',
    name: 'newClub',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewClub.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Nouvelle activité',
      requiresLogin: true
    },
    path: '/activite/new',
    name: 'newActivite',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewActivite.vue')
    /* beforeEnter (to, from, next) {
      if (store.state.isLog) { next() } else { next({ name: 'home' }) }
    } */
  },
  {
    meta: {
      title: 'Départements',
      requiresLogin: true
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
      title: 'Formations',
      requiresLogin: true
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
      title: 'Partenaires',
      requiresLogin: true
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
      title: 'Etudiants',
      requiresLogin: true
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
      title: 'Salles',
      requiresLogin: true
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
      title: 'Outils',
      requiresLogin: true
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
      title: 'Enseignants',
      requiresLogin: true
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
      title: 'Doctorants',
      requiresLogin: true
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
      title: 'Clubs scientifiques et culturels',
      requiresLogin: true
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
      title: 'Activités',
      requiresLogin: true
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
      title: 'Administratifs',
      requiresLogin: true
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
      title: 'Statistiques générales',
      requiresLogin: true
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
      title: 'Charts',
      requiresLogin: true
    },
    path: '/charts',
    name: 'charts',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Stat/Charts.vue')
  },
  {
    meta: {
      title: 'Audit Social',
      requiresLogin: true
    },
    path: '/audit',
    name: 'Audit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/Stat/Audit.vue')
  },
  // Détails
  {
    meta: {
      title: 'Détails de la formation',
      requiresLogin: true
    },
    path: '/formation/:id',
    name: 'FormationDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/FormationDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du niveau',
      requiresLogin: true
    },
    path: '/niveau/:id',
    name: 'NiveauDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/NiveauDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du département',
      requiresLogin: true
    },
    path: '/departement/:id',
    name: 'DepartementDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/DepartementDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du partenaire',
      requiresLogin: true
    },
    path: '/partenaire/:id',
    name: 'PartenaireDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/PartenaireDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails de la salle',
      requiresLogin: true
    },
    path: '/salle/:id',
    name: 'SalleDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/SalleDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du club',
      requiresLogin: true
    },
    path: '/club/:id',
    name: 'ClubDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/ClubDetail.vue'),
    props: true
  },
  {
    meta: {
      title: "Détails de l'étudiant",
      requiresLogin: true
    },
    path: '/etudiant/:id',
    name: 'EtudiantDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/EtudiantDetail.vue'),
    props: true
  },
  {
    meta: {
      title: "Détails de l'enseignant",
      requiresLogin: true
    },
    path: '/enseignant/:id',
    name: 'EnseignantDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/EnseignantDetail.vue'),
    props: true
  },
  {
    meta: {
      title: "Détails de l'administratif",
      requiresLogin: true
    },
    path: '/administratif/:id',
    name: 'AdministratifDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/AdministratifDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du doctorant',
      requiresLogin: true
    },
    path: '/doctorant/:id',
    name: 'DoctorantDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/DoctorantDetail.vue'),
    props: true
  },
  {
    meta: {
      title: 'Détails du module',
      requiresLogin: true
    },
    path: '/module/:id',
    name: 'DelibDetail',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/details/DelibDetail.vue'),
    props: true
  },
  /* Query */
  {
    meta: {
      title: "Création d'une requete",
      requiresLogin: true
    },
    path: '/query',
    name: 'QueryCreator',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/query/Query.vue'),
    props: true
  },
  {
    meta: {
      title: 'Résultats',
      requiresLogin: true
    },
    path: '/query/results',
    name: 'QueryResult',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/query/Result.vue'),
    props: true
  },
  {
    meta: {
      title: 'Graphe des résultats',
      requiresLogin: true
    },
    path: '/query/results/chart',
    name: 'ChartResult',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/query/ChartResult.vue'),
    props: true
  },
  {
    meta: {
      title: 'Résultats sauvegardées',
      requiresLogin: true
    },
    path: '/results',
    name: 'SavedQuery',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/query/SavedQuery.vue'),
    props: true
  },
  {
    meta: {
      title: 'Historique',
      requiresLogin: true
    },
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/History.vue'),
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

// guard clause
router.beforeEach((to, from, next) => {
  console.log('isLog = ' + store.state.isLog)
  console.log(sessionStorage)
  if (to.matched.some(record => record.meta.requiresLogin) && sessionStorage.getItem('vue-session-key') === '{}') {
    console.log(sessionStorage.getItem('vue-session-key'))
    console.log('you need to login')
    next('/login')
  } else {
    next()
  }
})

// GOOD
/* router.beforeEach((to, from, next) => {
  if (!this.$session.exists()) next({ name: 'login' })
  else next()
}) */
export default router
