import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Law from '@/components/Law'
import Profile from '@/components/Profile'
import Agent from '@/components/Agent'
import Patent from '@/components/Patent'
import Case from '@/components/Case'
import Insurance from '@/components/Insurance'
import Info from '@/components/head'
import Profile_modifyInfo from '@/components/profile/modifyInfo'
import Profile_info from '@/components/profile/info'
import Profile_password from '@/components/profile/password'
import Profile_avatar from '@/components/profile/avatar'
import Profile_modifyEmail from '@/components/profile/email'
import Profile_modifyPhone from '@/components/profile/phone'
import Case_manage from '@/components/profile/casemanage'
import Suqianfuwu from '@/components/profile/suqianfuwu'
import Suzhongfuwu from '@/components/profile/suzhongfuwu'
import Baoxianxinxi from '@/components/profile/baoxianxinxi'
import Learning from '@/components/learning'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/agent',
      name: 'Agent',
      component: Agent
    },
    {
      path: '/insurance',
      name: 'Insurance',
      component: Insurance
    },
    {
      path: '/case',
      name: 'Case',
      component: Case
    },
    {
      path: '/patent',
      name: 'Patent',
      component: Patent
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
      path: '/learning',
      name: 'Learning',
      component: Learning
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
      },{
      	path: 'casemanage',
        component: Case_manage,
        name: 'case_manage'
      },{
      	path: 'suqianfuwu',
        component: Suqianfuwu,
        name: 'suqianfuwu'
      },{
      	path: 'suzhongfuwu',
        component: Suzhongfuwu,
        name: 'suzhongfuwu'
      },{
      	path: 'baoxianxinxi',
        component: Baoxianxinxi,
        name: 'baoxianxinxi'
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
