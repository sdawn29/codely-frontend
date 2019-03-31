import Vue from 'vue'
import Router from 'vue-router'
import Auth from './views/Auth.vue'
import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'
import Signout from './components/Auth/Signout.vue'

import App from './views/Index.vue'
import Dashboard from './components/Index/Dashboard.vue'
import Sandbox from './components/Index/Sandbox.vue'
import Beginner from './components/Index/Beginner.vue'
import Intermediate from './components/Index/Intermediate.vue'
import Expert from './components/Index/Expert.vue'
import Solve from './components/Index/Solve.vue'

import Admin from './components/Index/Admin.vue'
import AdminIndex from './components/admin/AdminIndex.vue'
import AddQuestion from './components/admin/question/AddQuestion.vue'
import ViewQuestions from './components/admin/question/ViewQuestion.vue'
import Details from './components/admin/question/DetailedView.vue'

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
        { path: 'admin', component: Admin , children: [
          { path: '', component: AdminIndex},
          { path: 'addquestion', component: AddQuestion},
          { path: 'viewquestion', component: ViewQuestions},
          { path: 'viewquestion/:qid', name: 'View', component: Details}
        ]},
        { path: 'dashboard', component: Dashboard},
        { path: 'sandbox', component: Sandbox},
        { path: 'beginner', component: Beginner},
        { path: 'intermediate', component: Intermediate},
        { path: 'expert', component: Expert},
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
