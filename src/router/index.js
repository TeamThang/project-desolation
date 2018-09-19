import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Law from '@/components/Law'
import Profile from '@/components/Profile'
import ProfileHello from '@/components/profile/hello'
import Info from '@/components/head'

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
      children: [
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
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children: [
        {
          path: 'ProfileHello',
          component: ProfileHello
        }
      ]
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '*',
      redirect: '/login'
    }
  ],
  mode: 'history'
})
