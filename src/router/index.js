import Vue from 'vue'
import VueRouter from 'vue-router'
import Dash from '../views/Dash.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import page404 from '../views/404.vue'

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
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'dash'
    },
    path: '/dash',
    name: 'dash',
    component: Dash
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'home'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tables.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    meta: {
      title: 'New client'
    },
    path: '/client/new',
    name: 'client.new',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue')
  },
  {
    meta: {
      title: 'Edit client'
    },
    path: '/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Nouveau Departement'
    },
    path: '/insertion/departement',
    name: 'newDep',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewDep.vue')
  },
  {
    meta: {
      title: 'Nouvelle formation'
    },
    path: '/insertion/formation',
    name: 'newForm',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/insertion/NewForm.vue')
  },
  {
    meta: {
      title: 'Départements'
    },
    path: '/tables/departement',
    name: 'dep',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Dep.vue')
  },
  {
    meta: {
      title: 'Formations'
    },
    path: '/tables/formation',
    name: 'form',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/affichage/Form.vue')
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
  if ((to.name !== 'login' && to.name !== 'home') && !this.$store.isLog) next({ name: 'login' })
  else next()
}) */
export default router
