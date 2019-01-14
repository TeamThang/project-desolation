<template>
<el-row class="head-el-row" type="flex" justify="center">
  <el-col :span="9">
    <div class="head-item">
      <router-link class="head-logo" to="/home">
        知识产权保险服务平台
      </router-link>
    </div>
  </el-col>
  <el-col :span="3">
    <div class="head-item" v-if="headItem[0]">
      <router-link  class="head-link" :to="headItem[0] ? headItem[0].path : '/home'">
        {{headItem[0] ? headItem[0].name : ''}}
      </router-link>
    </div>
  </el-col>
  <el-col :span="3">
    <div class="head-item" v-show="headItem[1]">
      <router-link  class="head-link" :to="headItem[1] ? headItem[1].path : '/home'">
        {{headItem[1] ? headItem[1].name : ''}}
      </router-link>
    </div>
  </el-col>
  <el-col :span="3">
    <div class="head-item" v-show="headItem[2]">
      <router-link  class="head-link" :to="headItem[2] ? headItem[2].path : '/home'">
        {{headItem[2] ? headItem[2].name : ''}}
      </router-link>
    </div>
  </el-col>
  <el-col :span="3">
    <div class="head-item" v-show="headItem[3]">
      <router-link  class="head-link" :to="headItem[3] ? headItem[3].path : '/home'">
        {{headItem[3] ? headItem[3].name : ''}}
      </router-link>
    </div>
  </el-col>
  <el-col :span="3">
    <div class="head-item" v-show="headItem[4]">
      <router-link  class="head-link" :to="headItem[4] ? headItem[4].path : '/home'">
        {{headItem[4] ? headItem[4].name : ''}}
      </router-link>
    </div>
  </el-col>
  <el-col :span="3">
    <div class="grid-content bg-purple-dark">
      <el-header style="text-align: right;">
        <el-dropdown>
          <span class="el-dropdown-link font-white">
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile/info" v-show="isLogin">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <router-link to="/profile/modifyInfo" v-show="isLogin">
              <el-dropdown-item>完善资料</el-dropdown-item>
            </router-link>
            <router-link to="/profile/password" v-show="isLogin">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link>
            <div @click="logout()" v-show="isLogin">
              <el-dropdown-item>登出</el-dropdown-item>
            </div>
            <router-link to="/login" v-show="!isLogin">
              <el-dropdown-item>登录</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
    </div>
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
</template>

<script>
import Ajax from "./../lib/ajax";
import Config from "./../lib/config";
  export default {
  name: "head",
  data() {
    return {
        name: '',
        isLogin: false,
        right: {
          'F': [{name:'专利信息查询', path: '/patent'},{name: '专利代理信息查询', path: '/agent'},{name:'诉讼案件查询',path:'/case'},{name:'知识产权保险',path:'/insurance'},{name:'法规培训',path:'/learning'}],
          'P': [{name:'专利信息查询', path: '/patent'},{name:'专利代理信息查询',path:'/agent'},{name:'诉讼案件查询',path:'lawoffice'},{name:'知识产权保险',path:'/insurance'}],
          'B': [{name:'专利代理信息查询',path: '/agent'},,{name:'诉讼案件查询',path:'/lawyer'}]
        },
        headItem: []
      }
  },
  methods: {
    getCurrentUser() {
      var that = this;
      Ajax(Config.AjaxUrl + '/get_current_user', 'get',function(data){
            console.log('getCurrentUser', data)
            if(data.code == 0){
              that.name = data.data.name || data.data.account
              that.$store.commit('setUserName', that.name)
              that.isLogin = true
              that.headItem = that.right[data.data.level]
              that.$store.commit('setUserLevel', data.data.level)
            } else {
              that.name = '游客'
            }
        },function(){
          that.name = '游客'
        })
    },
    logout() {
      var that = this;
      console.log('logout')
      Ajax(Config.AjaxUrl + '/auth/logout', 'get',function(data){
            console.log('logout', data)
            if(data.code == 0){
              that.name = '游客'
              that.isLogin = false
              that.$store.commit('setUserName', null)
              location.reload()
            } else {
            }
        },function(){
        })
    }
  },
  created: function() {
    this.getCurrentUser()
  }
  }
</script>

<style>
  a {
    text-decoration: none;
  }
  .head-el-row{
    min-width: 1080px;
    background: rgb(29, 72, 114);
  }
  .head-el-row .el-col{
    height: 60px;
  }
  .head-item{
    height: 60px;
    background: rgb(29, 72, 114);
    text-align: center;
    cursor: pointer;
    font-size: 0.15rem;
    word-wrap:break-word;
  }
  .head-item:before{
    content:"";
    display:inline-block;
    height:100%;
    vertical-align:middle;
  }
  .head-link{
    color: #ffffff;
    vertical-align: middle;
  }
  .head-logo{
    text-align: center;
    vertical-align: middle;
    font-size: 0.3rem;
    font-weight: 700;
    color: #ffffff;
    background: rgb(29, 72, 114);
  }
  .el-row {
    margin-bottom: 0.2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
  }
  .bg-purple-dark {
    background: rgb(29, 72, 114);
  }
  .grid-content {
    min-height: 60px;
    width: 100%;
  }
  .el-header {
    color: #fff;
    line-height: 60px;
  }
  .font-white {
    color: white;
  }
  .el-dropdown-link {
    outline: none;
    font-size: 0.16rem;
    cursor: pointer;
  }
  .el-dropdown-menu {
    margin-top: -20px !important;
  }
</style>