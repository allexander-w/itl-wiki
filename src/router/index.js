import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/login',
        name: 'Home',
        meta: {
          layout: 'DefaultSignInLayout'
        },
        component: () => import('../views/Home.vue')
      },
      {
        path: '/account',
        name: 'Account',
        meta: {
          layout: 'DefaultLayout',
          isAuth: true
        },
        component: () => import('../views/Account.vue')
      },
      {
        path: '/account/profile',
        name: 'Profile',
        meta: {
        layout: 'DefaultLayout',
        isAuth: true
        },
        component: () => import('../views/Profile.vue')
      },
      {
        path: '/sign-in',
        name: 'SignIn',
        meta: {
          layout: 'DefaultSignInLayout'
        },
        component: () => import('../views/SignIn.vue')
      },
      {
        path: '/create-company',
        name: 'Company',
        meta: {
          layout: 'DefaultSignInLayout',
          isAuth: true
        },
        component: () => import('../views/Company.vue')
      },
      {
        path: '/create-company/add-users',
        name: 'AddUsers',
        meta: {
          layout: 'DefaultSignInLayout',
          isAuth: true
        },
        component: () => import('../views/AddUsers.vue')
      },
      {
        path: '/account/bookmarks',
        name: 'Bookmarks',
        meta: {
          layout: 'DefaultLayout',
          isAuth: true
        },
        component: () => import('../views/Bookmarks.vue')
      },
      {
        path: '/account/works',
        name: 'Works',
        meta: {
          layout: 'DefaultLayout',
          isAuth: true
        },
        component: () => import('../views/Works.vue')
      },
      {
        path: '/account/activity',
        name: 'Activity',
        meta: {
          layout: 'DefaultLayout',
          isAuth: true
        },
        component: () => import('../views/Activity.vue')
      },
      {
        path: '/account/works/:id',
        name: 'InDocument',
        meta: {
          layout: 'DefaultLayout',
          isAuth: true
        },
        component: () => import('../views/InDocument.vue')
      },
      {
        path: '/account/add-document',
        name: 'AddDocument',
        meta: {
          layout: 'EditLayout',
          isAuth: true
        },
        component: () => import('../views/AddDocument.vue')
      }
    ]
  })
  
router.beforeEach((to,from,next)=>{
  const user = firebase.auth().currentUser
  const isAuth = to.matched.some(record => record.meta.isAuth)
  
  if (!user && isAuth){
    next('/sign-in?message=authRequired')
  } else {next()}

  if (user && to.path === '/sign-in' || user && to.path === '/login'){
    next('/account?message=authTrue')
  }
})

export default router
