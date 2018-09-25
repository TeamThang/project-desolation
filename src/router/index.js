import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Law from '@/components/Law'
import Profile from '@/components/Profile'
import Agent from '@/components/Agent'
import Info from '@/components/head'
import Profile_modifyInfo from '@/components/profile/modifyInfo'
import Profile_info from '@/components/profile/info'
import Profile_password from '@/components/profile/password'
import Profile_avatar from '@/components/profile/avatar'
import Profile_modifyEmail from '@/components/profile/email'
import Profile_modifyPhone from '@/components/profile/phone'

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
        }
      ]
    },
    {
      path: '/agent',
      name: 'Agent',
      component: Agent
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
      children: [{
      	path: 'info',
        component: Profile_info,
        name: 'profile_info'
      },{
      	path: 'modifyInfo',
        component: Profile_modifyInfo,
        name: 'profile_modifyInfo'
      },{
      	path: 'avatar',
        component: Profile_avatar,
        name: 'profile_avatar'
      },{
      	path: 'modifyEmail',
        component: Profile_modifyEmail,
        name: 'profile_modifyEmail'
      },{
      	path: 'modifyPhone',
        component: Profile_modifyPhone,
        name: 'Profile_modifyPhone'
      },{
      	path: 'password',
        component: Profile_password,
        name: 'profile_password'
      }]
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
