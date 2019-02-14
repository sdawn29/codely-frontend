import Vue from 'vue'
import Router from 'vue-router'
import Auth from './views/Auth.vue'
import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'
import Signout from './components/Auth/Signout.vue'

import App from './views/Index.vue'
import Dashboard from './components/Index/Dashboard.vue'
import Admin from './components/Index/Admin.vue'
import Sandbox from './components/Index/Sandbox.vue'
import Beginner from './components/Index/Beginner.vue'
import Solve from './components/Index/Solve.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Auth,
      children: [
        { path: '', component: Login},
        { path: '/signup', component: Register }
      ]
    },
    {
      path: '/app',
      name: 'App',
      component: App,
      children: [
        { path: 'admin', component: Admin},
        { path: 'dashboard', component: Dashboard},
        { path: 'sandbox', component: Sandbox},
        { path: 'beginner', component: Beginner},
        { path: 'solve/:qid', name: 'Solve', component: Solve}
      ]
    },
    {
      path: '/signout',
      name: 'Signout',
      component: Signout,
    },
  ]
})
