import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Law from '@/components/Law'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
        children:[
          {
            path: '/',
            name: 'Law',
            component: Law
          },
          {
            path: '/law',
            name: 'Law',
            component: Law
          }
        ]
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      { 
        path: '*', 
        redirect: '/login'
      }
  ],
 mode:"history"
})
